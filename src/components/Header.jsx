import React, { useContext, useState } from 'react';
import ContextProvider from '../context/ContextProvider';

const magicNumber = 8;

function Header() {
  const {
    planetName,
    setPlanetName,
    planets,
    setShouldFilter,
    setFilteredPlanets,
  } = useContext(ContextProvider);

  const [filterName, setFilterName] = useState('population');
  const [comparator, setComparator] = useState('maior que');
  const [numericFilter, setNumericFilter] = useState(0);
  const [arrayColumn, setArrayColumn] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  function filterNameChange({ target: { value } }) {
    if (value !== '') {
      return setPlanetName(value);
    }
    return setPlanetName(value);
  }

  function changeFilterName({ target: { value } }) {
    setFilterName(value);
  }

  function changeFilterComparation({ target: { value } }) {
    setComparator(value);
  }

  function deleteFilter(arrayFilter, filter) {
    const index = arrayFilter.indexOf(filter);
    arrayFilter.splice(index, 1);
    return setArrayColumn(arrayFilter);
  }

  function changeNumericFilter({ target: { value } }) {
    setNumericFilter(value);
  }

  function handleClick() {
    let filter = [];
    if (filterName === 'population'
      && comparator === 'maior que'
      && Number(numericFilter) === 0) {
      return (
        setShouldFilter(true),
        setFilteredPlanets(planets.slice(0, magicNumber))
      );
    }
    if (comparator === 'maior que') {
      filter = planets.filter(
        (planeta) => Number(planeta[filterName]) > Number(numericFilter),
      );
    } else if (comparator === 'menor que') {
      filter = planets.filter(
        (planeta) => Number(planeta[filterName]) < Number(numericFilter),
      );
    } else if (comparator === 'igual a') {
      filter = planets.filter(
        (planeta) => Number(planeta[filterName]) === Number(numericFilter),
      );
    }
    return (
      setShouldFilter(true),
      setFilteredPlanets(filter),
      deleteFilter(arrayColumn, filterName)
    );
  }

  return (
    <div>
      <h1>Projeto Trybe Wars</h1>

      <input
        type="text"
        data-testid="name-filter"
        placeholder="Filtrar por nome"
        value={ planetName }
        onChange={ (value) => filterNameChange(value) }
      />

      <select
        data-testid="column-filter"
        name="filterName"
        value={ filterName }
        onChange={ (value) => changeFilterName(value) }
      >
        { arrayColumn.map((column, index) => (
          <option key={ index } value={ column }>{column}</option>
        ))}
      </select>

      <select
        data-testid="comparison-filter"
        value={ comparator }
        onChange={ (value) => changeFilterComparation(value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ numericFilter }
        onChange={ (evt) => changeNumericFilter(evt) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>

    </div>
  );
}

export default Header;
