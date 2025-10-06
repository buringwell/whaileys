import React from 'react';
import { Link } from 'react-router-dom';

const NegaraView = ({ ubahCari, cariProduct, hasilCari, hasilFilter }) => {
  return (
    <div className="beranda w-full dark:bg-blue-950  bg-gray-500 text-white">
      {/* Input Pencarian */}
      <label className="input input-bordered text-red-500 flex items-center gap-2 dark:bg-gray-300 text-blue-600">
        <input
          type="text"
          className="grow cari"
          placeholder="Search Country"
          onChange={(input) => ubahCari(input.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      
      {/* Tampilkan hasil pencarian */}
      <p className='text-gray-300'>
        Hasil dari : {cariProduct}, ditemukan : {hasilCari?.length} negara
      </p>

      {/* Grid untuk menampilkan hasil negara */}
      <div className="grid grid-cols-3 gap-5 p-5 -mt-5 my-5 -m-2">
        
        {hasilFilter?.map((negara) => (
          <div className="card bg-base-100 w-96 shadow-xl dark:bg-gray-300 bg-blue-950" key={negara?.name}>
            <div className="card-body dark:bg-gray-300 bg-blue-950">
              <h2 className="card-title dark:text-blue-900">{negara?.name}</h2>
              <img src={negara.flag} alt={negara.name} />
              <p className='dark:text-blue-900'> currency : {negara.currency}</p>
              <div className="card-actions justify-end">
                <Link to={"/negaradetail/"+ negara.id} className="btn btn-primary dark:bg-gray-700 bg-gray-200 text-blue-950">
                  Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bagian Footer */}
      <footer className="footer bg-neutral text-neutral-content p-10">
        <nav>
          <h6 className="footer-title">Layanan</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Perusahaan</h6>
          <a className="link link-hover">Tentang kami</a>
          <a className="link link-hover">Kontak</a>
          <a className="link link-hover">Karir</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Syarat penggunaan</a>
          <a className="link link-hover">Kebijakan privasi</a>
          <a className="link link-hover">Kebijakan cookie</a>
        </nav>
      </footer>
    </div>
  );
}

export default NegaraView;
