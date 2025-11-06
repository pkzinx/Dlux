import React, { useState } from 'react';
import * as S from './ScheduleModal.styles';

import { Button } from '../../atoms/Button/Button';
import { InputGroup } from '../InputGroup/InputGroup';
import { SelectGroup } from '../SelectGroup/SelectGroup';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui poderíamos enviar para uma API ou integrar com backend.
    // Por ora, apenas fechamos o modal.
    onClose();
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

  const timeOptions = React.useMemo(() => {
    if (date === todayYMD) {
      const nowRounded = roundUpTo20(new Date());
      return allSlots.filter(s => s > nowRounded);
    }
    return allSlots;
  }, [date, allSlots, todayYMD]);

  // Se o horário atual ficar inválido após trocar a data, limpar tempo
  React.useEffect(() => {
    if (time && !timeOptions.includes(time)) setTime('');
  }, [date, timeOptions]);

  return (
    <>
      <S.Background aria-hidden={isOpen} aria-label="Overlay Modal" $isOpen={isOpen} />
      <S.Modal $isOpen={isOpen} aria-label="Modal">
        <S.Title>Agendar Serviço {serviceTitle ? `- ${serviceTitle}` : ''}</S.Title>
        <S.Form onSubmit={handleSubmit}>
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
            required={false}
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
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDate(e.target.value)}
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
              placeholder="Selecione o horário"
              value={time}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTime(e.target.value)}
            >
              {timeOptions.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </SelectGroup>
          </S.FieldInline>

          <S.FullRow>
            <S.BarberGrid>
              {barbers.map(({ name: bName, src }) => (
                <S.BarberCard key={bName} $selected={barberName === bName}>
                  <input
                    type="radio"
                    name="barber"
                    value={bName}
                    checked={barberName === bName}
                    onChange={() => setBarberName(bName)}
                    style={{ display: 'none' }}
                  />
                  <S.BarberAvatar src={src} alt={`Foto do barbeiro ${bName}`} />
                  <span>{bName}</span>
                </S.BarberCard>
              ))}
            </S.BarberGrid>
          </S.FullRow>

          <S.Actions>
            <Button as="button" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button as="button" type="submit" disabled={!barberName || !name || !date || !time}>
              Agendar
            </Button>
          </S.Actions>
        </S.Form>
      </S.Modal>
    </>
  );
};