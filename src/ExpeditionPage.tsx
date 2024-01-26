import './ExpeditionPage.scss';

import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import ExpeditionItem from './ExpeditionItem';
import { IFoundItem } from './models';
import { ExpeditionService } from './ExpeditionService';

function ExpeditionsPage(): any {
  const service = new ExpeditionService();
  const [results, setResults] = useState<IFoundItem[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchInputRef.current) {
      searchInputRef.current.value = searchParams.get('q') ?? '';
      handleSearch(searchInputRef.current.value);
    }
  }, []);

  /**
   * @function updateURLParameter
   * @description Updates the value of the "q" parameter in the URL search query without reloading the page.
   * @param {string} query - The new value to set for the "q" parameter.
   */
  const updateURLParameter = (query: string) => {
    let searchParams = new URLSearchParams(window.location.search);
    query
      ? searchParams.set('q', query)
      : searchParams.delete('q');
    window.history.pushState({}, '', '?' + searchParams.toString());
  };


  /**
   * Handles the search functionality.
   * @param {string} query - The search query.
   * @returns {Promise<void>} - A promise that resolves when the search is complete.
   */
  const handleSearch = async (query: string) => {
    service.query = query;
    updateURLParameter(service.query);
    await service.request();
    setResults(service.found);
  };

  return <div className="container d-flex flex-column gap-4">

    <div className="d-flex">
      <div className="input-group input-icon">
        <i className="fas fa-search"></i>
        <input type="text"
               ref={searchInputRef}
               onChange={({ target: { value } }) => handleSearch(value)}
               className="form-control" placeholder="Buscar" aria-label="Buscar" aria-describedby="basic-addon1"></input>
      </div>
    </div>
    <div className="d-flex justify-content-between align-items-center">
      <div className="form-check d-flex justify-content-between align-items-center gap-2">
        <input className="form-check-input checkbox-class" type="checkbox" id="miCheckbox"/>
        <label className="form-check-label fw-bold" htmlFor="miCheckbox">
          Seleccionar todo
        </label>
      </div>

      <div className="d-flex flex-nowrap align-items-center">
        <label htmlFor="miSelector" className="me-2 text-nowrap text-muted">Ordenar por:</label>
        <select id="miSelector" className="form-select">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
    </div>
    <div className="d-flex gap-3 flex-column">
      {results.map((item: IFoundItem, i: number) => <ExpeditionItem key={i} item={item}/>)}
    </div>
  </div>;
}

export default observer(() => <ExpeditionsPage/>);
