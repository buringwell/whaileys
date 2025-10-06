import axios from 'axios';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NegaraView from './NegaraView';

const nilaiDefault = {
  data: [],
  filterData: [],
  loading: true,
  error: null, // Tambahkan error di state
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BERHASIL":
      return {
        ...state,
        data: action.payload,
        filterData: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_GAGAL": // Aksi baru untuk error handling
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SET_FILTER":
      return {
        ...state,
        filterData: action.payload,
      };
    default:
      throw new Error("Aksi tidak dikenal");
  }
};

const Negara = () => {
  const [state, dispatch] = useReducer(reducer, nilaiDefault);
  const [hasilCari, setHasilCari] = useState();
  const [cari, setCari] = useSearchParams();
  const cariProduct = cari.get("cariproduct");

  const ambilNegara = async () => {
    try {
      const response = await axios.get(
        "https://freetestapi.com/api/v1/countries"
      );
      const data = response.data;
      dispatch({ type: "FETCH_BERHASIL", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_GAGAL", payload: "Gagal mengambil data negara" });
    }
  };

  useEffect(() => {
    if (!cariProduct) {
      ambilNegara();
    } else {
      ubahCari(cariProduct);
    }
  }, [cariProduct]);

  const ubahCari = useCallback(
    async (input) => {
      setCari({ cariproduct: input });
      try {
        const response = await axios.get(
          "https://freetestapi.com/api/v1/countries?search=" + input
        );
        const data = response.data;
        setHasilCari(data);
        dispatch({ type: "SET_FILTER", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_GAGAL", payload: "Gagal mencari negara" });
      }
    },
    [cariProduct, setCari]
  );

  const hasilFilter = cariProduct ? hasilCari : state.filterData;

console.log(state)
  return (
    <div className='w-full'>
      <NegaraView
        cariProduct={cariProduct}
        hasilCari={hasilCari}
        hasilFilter={hasilFilter}
        ubahCari={ubahCari}
      />
    </div>
  );
};

export default Negara;
