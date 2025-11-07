import React, { useState } from 'react';
import * as S from './ScheduleModal.styles';

import { Button } from '../../atoms/Button/Button';
import { InputGroup } from '../InputGroup/InputGroup';
import { SelectGroup } from '../SelectGroup/SelectGroup';
import { ModalForm } from '../ModalForm/ModalForm';

export type Barber = {
  name: string;
  src: string;
};

export type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  barbers: Barber[];
  serviceTitle?: string;
};

export const ScheduleModal = ({ isOpen, onClose, barbers, serviceTitle }: ScheduleModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [barberName, setBarberName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<'success' | 'error'>('success');
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      // Monta datas
      const startDatetime = `${date}T${time}:00`;
      // Heurística simples de duração
      const durationMinutes = /barba/i.test(serviceTitle || '') ? 30 : 40;
      const start = new Date(startDatetime);
      const end = new Date(start.getTime() + durationMinutes * 60000);
      const pad = (n: number) => String(n).padStart(2, '0');
      const endDatetime = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}T${pad(end.getHours())}:${pad(end.getMinutes())}:00`;

      // Envia via API do Next.js (proxy) para o backend
      const resp = await fetch('/api/appointments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          barberName,
          clientName: name,
          clientPhone: phone,
          serviceTitle,
          startDatetime,
          endDatetime,
          notes: `Agendado via site${serviceTitle ? ' - ' + serviceTitle : ''}`,
        }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.detail || 'Falha ao agendar');
      // Sucesso: fecha modal de agendamento e abre feedback de sucesso
      onClose();
      setFeedbackStatus('success');
      setFeedbackOpen(true);
      // Opcional: limpar campos
      setName(''); setPhone(''); setDate(''); setTime(''); setBarberName('');
    } catch (err) {
      setFeedbackStatus('error');
      setFeedbackOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Utilidades para datas e horários
  const toYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const formatDM = (d: Date) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

  const today = new Date();
  const todayYMD = toYMD(today);

  const dateOptions = React.useMemo(() => {
    const d0 = new Date();
    const d1 = new Date();
    d1.setDate(d1.getDate() + 1);
    const d2 = new Date();
    d2.setDate(d2.getDate() + 2);
    return [d0, d1, d2].map(d => ({ label: formatDM(d), value: toYMD(d) }));
  }, []);

  const generateSlots = () => {
    const slots: string[] = [];
    for (let h = 8; h <= 17; h++) {
      for (const m of [0, 20, 40]) {
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        const t = `${hh}:${mm}`;
        // Limitar até 17:40
        if (h === 17 && m > 40) continue;
        slots.push(t);
      }
    }
    return slots;
  };

  const roundUpTo20 = (d: Date) => {
    let h = d.getHours();
    let m = d.getMinutes();
    const bucket = Math.ceil(m / 20) * 20;
    if (bucket === 60) {
      h = h + 1;
      m = 0;
    } else {
      m = bucket;
    }
    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  const allSlots = React.useMemo(() => generateSlots(), []);

  const serviceDurationMinutes = React.useMemo(() => {
    const normalized = (serviceTitle || '').toLowerCase();
    if (normalized.includes('barba') && normalized.includes('cabelo')) return 60;
    if (normalized.includes('barba')) return 30;
    if (normalized.includes('cabelo')) return 40;
    return 40; // padrão
  }, [serviceTitle]);

  const fetchAvailableSlots = async (selectedDate: string, selectedBarberName: string) => {
    if (!selectedDate || !selectedBarberName) {
      setTimeOptions([]);
      return;
    }
    try {
      setLoadingSlots(true);
      const params = new URLSearchParams({
        date: selectedDate,
        barberName: selectedBarberName,
        durationMinutes: String(serviceDurationMinutes),
      });
      const r = await fetch(`/api/appointments/available?${params.toString()}`, {
        headers: { Accept: 'application/json' },
      });
      const data = await r.json();
      if (!r.ok) {
        console.error('Erro ao buscar horários disponíveis:', data);
        setTimeOptions([]);
      } else {
        const slots: string[] = Array.isArray(data?.slots) ? data.slots : [];
        setTimeOptions(slots);
        if (time && !slots.includes(time)) setTime('');
      }
    } catch (e) {
      console.error('Falha na requisição de disponibilidade:', e);
      setTimeOptions([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  // Se o horário atual ficar inválido após trocar dependências, limpar tempo
  React.useEffect(() => {
    if (time && !timeOptions.includes(time)) setTime('');
  }, [timeOptions, time]);

  // Atualiza horários ao trocar serviço (pois muda a duração)
  React.useEffect(() => {
    if (date && barberName) fetchAvailableSlots(date, barberName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceDurationMinutes]);

  return (
    <>
      <S.Background aria-hidden={isOpen} aria-label="Overlay Modal" $isOpen={isOpen} />
      <S.Modal $isOpen={isOpen} aria-label="Modal">
        <S.Title>Agendar Serviço {serviceTitle ? `- ${serviceTitle}` : ''}</S.Title>
        <S.Form onSubmit={handleSubmit}>
          {/* Seleção de barbeiros logo abaixo do título */}
          <S.FullRow>
            <S.BarberGrid>
              {barbers.map(({ name: bName, src }) => (
                <S.BarberCard key={bName} $selected={barberName === bName}>
                  <input
                    type="radio"
                    name="barber"
                    value={bName}
                    checked={barberName === bName}
                    onChange={() => {
                      setBarberName(bName);
                      if (date) fetchAvailableSlots(date, bName);
                    }}
                    style={{ display: 'none' }}
                  />
                  <S.BarberAvatar src={src} alt={`Foto do barbeiro ${bName}`} />
                  <span>{bName}</span>
                </S.BarberCard>
              ))}
            </S.BarberGrid>
          </S.FullRow>

          <S.FullRow>
            <InputGroup
              label="Nome"
              labelFor="nome"
              required
              type="text"
              value={name}
              placeholder="Ex: João Silva"
              onChange={(e: any) => setName(e.target.value)}
              marginBottom
            />
          </S.FullRow>

          <InputGroup
            label="Telefone"
            labelFor="telefone"
            required
            type="text"
            value={phone}
            placeholder="Ex: (11) 99999-9999"
            onChange={(e: any) => setPhone(e.target.value)}
          />

          <S.FieldInline>
            <SelectGroup
              label="Data"
              labelFor="data"
              required
              placeholder="Selecione a data"
              value={date}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const v = e.target.value;
                setDate(v);
                if (barberName) fetchAvailableSlots(v, barberName);
              }}
            >
              {dateOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </SelectGroup>
            <SelectGroup
              label="Horário"
              labelFor="horario"
              required
              placeholder={loadingSlots ? 'Carregando...' : (timeOptions.length ? 'Selecione o horário' : (date && barberName ? 'Sem horários disponíveis' : 'Selecione data e barbeiro'))}
              value={time}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTime(e.target.value)}
              disabled={!date || !barberName || loadingSlots || timeOptions.length === 0}
            >
              {timeOptions.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </SelectGroup>
          </S.FieldInline>

          {/* Seleção de barbeiros movida para cima; campos de data/hora permanecem aqui */}

          <S.Actions>
            <Button as="button" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button as="button" type="submit" disabled={!barberName || !name || !phone || !date || !time || submitting}>
              {submitting ? 'Agendando...' : 'Agendar'}
            </Button>
          </S.Actions>
        </S.Form>
      </S.Modal>
      <ModalForm status={feedbackStatus} isOpen={feedbackOpen} onClick={() => setFeedbackOpen(false)} />
    </>
  );
};