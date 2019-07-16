import { province } from './province';
import { city } from './city';
import { country } from './country';

export const setItem = (key, value) => {
  return localStorage.setItem(key, value);
};

export const getItem = key => {
  return localStorage.getItem(key);
};

export const removeItem = key => {
  return localStorage.removeItem(key);
};

export const getRegions = () => {
  province.forEach(provinceItem => {
    // 省
    provinceItem.label = provinceItem.name;
    provinceItem.value = provinceItem.name;
    provinceItem.key = provinceItem.name;

    const children = city[provinceItem.id];
    if (children) {
      provinceItem.children = children;
      // 市
      provinceItem.children.forEach(cityItem => {
        cityItem.label = cityItem.name;
        cityItem.value = cityItem.name;
        cityItem.children = country[cityItem.id];
        cityItem.key = cityItem.name;

        const children = country[cityItem.id];
        if (children) {
          cityItem.children = children;
          // 区
          cityItem.children.forEach(countryItem => {
            countryItem.label = countryItem.name;
            countryItem.value = countryItem.name;
            countryItem.key = countryItem.name;
          });
        }
      });
    }
  });
  return province;
};
