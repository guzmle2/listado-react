import './ExpeditionPage.scss';

import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { IFoundItem } from './models';

const formatDate = (_date: Date) => {
  const date = new Date(_date);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = (date.getFullYear() % 100).toString().padStart(2, '0');

  return `${day}/${month}/${year}`;
};

const agoTime = (date: Date) => {
  const now = new Date();
  const timeDifference = now.getTime() - date.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Aproximadamente 30 días por mes
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} año${years > 1
      ? 's'
      : ''} atrás`;
  }
  if (months > 0) {
    return `${months} mes${months > 1
      ? 'es'
      : ''} atrás`;
  }
  if (days > 0) {
    return `${days} día${days > 1
      ? 's'
      : ''} atrás`;
  }
  if (hours > 0) {
    return `${hours} hora${hours > 1
      ? 's'
      : ''} atrás`;
  }
  if (minutes > 0) {
    return `${minutes} minuto${minutes > 1
      ? 's'
      : ''} atrás`;
  }

  return `${seconds} segundo${seconds > 1
    ? 's'
    : ''} atrás`;
};

const ExpeditionItem: FC<{ item: IFoundItem }> = ({ item }) => {
  return <div className={'row row-item'}>
    <div className="col-5 d-flex flex-column gap-2">
      <div className={'d-flex gap-3 align-items-center'}>
        <input className="form-check-input checkbox-class" type="checkbox" id="miCheckbox"/>
        <div className={'text-decoration-underline'}>{item.id}</div>
        <i className="fa-solid fa-ellipsis-vertical"></i>
        <i className="fa-solid fa-arrow-right-arrow-left"></i>
        <div className={'d-flex gap-1 align-items-center'}>
          <div>{item.reference}</div>
          <i className="fa-regular fa-copy text-muted"></i>
          <div className={'small text-muted'}>({agoTime(new Date(item.createdAt))})</div>
        </div>
      </div>
      <div className={'d-flex align-items-center gap-3'}>
        <i className="fa-regular fa-square-plus checkbox-class"></i>
        <i className="fa-regular fa-calendar"></i>
        <div className={'fw-bold'}>{formatDate(item.date)}</div>
        <i className="fa-regular fa-clock"></i>
        <div className="text-muted">Sin informacion</div>

      </div>
    </div>
    <div className="d-flex flex-column gap-2 col-2 ">
      <div className={'d-flex gap-1 align-items-center'}>
        <i className="fa-solid fa-users"></i>
        <div className={'text-muted'}>Sin asignar</div>
      </div>
      <div className={'d-flex gap-1 align-items-center'}>
        <i className="fa-solid fa-hotel "></i>
        <div className={'fw-bold'}>{item.client.profile?.emails[0]}</div>
      </div>
    </div>
    <div className="d-flex flex-column gap-2 col-5">
      <div className={'d-flex align-items-center gap-2'}>
        <i className={'fa-solid fa-circle '+(item.statusCode!=='created' ? 'text-danger':'')}></i>
        <div className={'fw-bold text-capitalize'}>{item.statusCode}</div>
        <div className={'ms-3 text-muted small'}>(03/08/2022, 11:13:29 am)</div>
      </div>
      <div className={'d-flex align-items-center gap-2'}>
        <i className="fa-solid fa-location-dot"></i>
        <div className={'fw-bold text-capitalize'}> {`${item.street}, ${item.city}, ${item.country}, ${item.postalCode}`}</div>
      </div>
    </div>
  </div>;
};


export default observer(ExpeditionItem);
