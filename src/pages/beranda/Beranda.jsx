import React, { useCallback, useEffect, useReducer, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import BerandaView from "./BerandaView";

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

const Beranda = () => {
  const [state, dispatch] = useReducer(reducer, nilaiDefault);

  const [product, setProduct] = useState();
  const [hasilCari, setHasilCari] = useState();
  const [cari, setCari] = useSearchParams();
  const cariProduct = cari.get("cariproduct");

  const ambilProduct = async () => {
    try {
      const response = await axios.get(
        "https://restaurant-api.dicoding.dev/list"
      );
      const data = await response.data;
      setProduct(data);
      dispatch({ type: "FETCH_BERHASIL", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_GAGAL", payload: "Gagal mengambil data produk" });
    }
  };

  useEffect(() => {
    if (!cariProduct) {
      ambilProduct();
    } else {
      ubahCari(cariProduct);
    }
  }, [cariProduct]);

  const ubahCari = useCallback(
    async (input) => {
      setCari({ cariproduct: input });
      try {
        const response = await axios.get(
          "https://restaurant-api.dicoding.dev/search?q=" + input
        );
        const data = await response.data;
        setHasilCari(data);
        dispatch({ type: "SET_FILTER", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_GAGAL", payload: "Gagal mencari produk" });
      }
    },
    [cariProduct, setCari]
  );

  const hasilFilter = cariProduct ? hasilCari : state.data;

  if (state.loading) {
    return <p>Loading...</p>; // Tampilkan indikator loading saat data diambil
  }

  if (state.error) {
    return <p>{state.error}</p>; // Tampilkan pesan error jika ada
  }
console.log(state)
  return (
    <div className="w-full">
    <BerandaView
      cariProduct={cariProduct}
      hasilCari={hasilCari}
      hasilFilter={hasilFilter}
      ubahCari={ubahCari}
    />
    </div>
  );
};

export default Beranda;
