import React from "react";

const Address = () => {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-center text-8xl text-transparent 
        bg-clip-text bg-gradient-to-b from-[#051F91] from-25% to-[#6DDB17]"
        >
          Adres Girişi
        </h1>
        <div className="flex flex-wrap -mx-4 py-28 gap-y-2">
          <div className="w-full md:w-1/2 px-1">
            <select className="w-full">
              <option selected>Adres Tipi Seçiniz</option>
              <option>iş</option>
              <option>ev</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-1">
            <input type="text" className="w-full" placeholder="Adress Satırı" />
          </div>
          <div className="w-full md:w-1/2 px-1">
            <input type="text" className="w-full" placeholder="Sokak" />
          </div>
          <div className="w-full md:w-1/2 px-1">
            <input type="text" className="w-full" placeholder="Posta Kodu" />
          </div>
          <div className="w-full md:w-1/2 px-1">
            <input type="text" className="w-full" placeholder="Konum" />
          </div>
          <div className="w-full md:w-1/2 px-1">
            <select className="w-full">
              <option>Kişi Seçiniz</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-1">
            {" "}
            <select className="w-full">
              <option>Ülke Seçiniz</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-1">
            <select className="w-full">
              <option>Şehir Seçiniz</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-1">
            <select className="w-full">
              <option>İlçe Seçiniz</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-1">
            <select className="w-full">
              <option>Mahalle Seçiniz</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
