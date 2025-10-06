import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NegaraDetail = () => {
  const { id } = useParams();
  const [negara, setNegara] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ambilProduct = async () => {
    try {
      const response = await axios.get(`https://freetestapi.com/api/v1/countries/${id}`);
      const data = await response.data;
      setNegara(data);
      setLoading(false);
    } catch (error) {
      setError("Gagal mengambil data negara");
      setLoading(false);
    }
  };

  useEffect(() => {
    ambilProduct();
  }, [id]); // Tambahkan id sebagai dependency agar useEffect dipanggil ulang jika id berubah

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='text-center w-full'>
      <img src={negara?.flag} alt={negara?.name} className="w-full max-w-md h-auto object-contain mb-8"/>
      <h1>{negara?.name}</h1>
      <p>Population: {negara?.population}</p>
      <p>Land Area: {negara?.land_area}</p>
      <p>Density: {negara?.density}</p>
      <p>Capital: {negara?.capital}</p>=
      <p>Currency: {negara?.currency}</p>
    </div>
  );
}

export default NegaraDetail;
