import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextProvider from './ContextProvider';

function ContextComponent({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetName, setPlanetName] = useState('');
  const [shouldFilter, setShouldFilter] = useState(false);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((data) => setPlanets(data.results));
  }, []);

  const context = {
    planets,
    planetName,
    setPlanetName,
    shouldFilter,
    setShouldFilter,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <ContextProvider.Provider value={ context }>
      { children }
    </ContextProvider.Provider>
  );
}

ContextComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextComponent;
