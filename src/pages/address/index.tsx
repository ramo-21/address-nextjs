import React, { ChangeEvent, useEffect, useState } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/input";
import Select from "@/components/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getCountry } from "@/store/apps/country";

enum addressType {
  JOB = "iş",
  HOME = "ev",
}

type FormValues = {
  addressType: addressType;
  addressLine: string;
  street: string;
  post_code: string;
  location: string;
  userId?: number;
  countryId?: number;
  cityId?: number;
  districtId?: number;
  townId?: number;
};

const addressFormSchema = yup.object().shape({
  addressType: yup.string().required("Lütfen adress tipi satırını seçiniz"),
  addressLine: yup.string().required("Lütfen adress satırını giriniz"),
  street: yup.string().required("Lütfen street satırını giriniz"),
  post_code: yup.string().required("Lütfen posta kodu satırını giriniz"),
  location: yup.string().required("Lütfen konum satırını giriniz"),
});

const defaultValues: FormValues = {
  addressType: addressType.HOME,
  addressLine: "",
  street: "",
  post_code: "",
  location: "",
  userId: 0,
  countryId: 0,
  cityId: 0,
  districtId: 0,
  townId: 0,
};

const Address = () => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>();

  // ** Selector
  const loading: boolean = useSelector(
    (state: RootState) => state.country.loading
  );
  const data: any = useSelector((state: RootState) => state.country.data);

  const [city, setCity] = useState<any[]>()

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(addressFormSchema),
  });

  const onSubmit = ({ addressType, addressLine }: FormValues) => {
    console.log(addressType, addressLine);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-center text-8xl text-transparent 
        bg-clip-text bg-gradient-to-b from-[#051F91] from-25% to-[#6DDB17]"
        >
          Adres Girişi
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-4 py-28 gap-y-2">
            <div className="w-full md:w-1/2 px-1">
              <Controller
                control={control}
                name="addressType"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">Adres Tipi</option>
                      <option value={addressType.HOME}>{addressType.HOME}</option>
                      <option value={addressType.JOB}>{addressType.JOB}</option>
                    </Select>
                  </>
                )}
              />
              {errors.addressType && <>{errors.addressType.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Adres satırı"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("addressLine", { required: true })}
              />
              {errors.addressLine && <>{errors.addressLine.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Sokak bilgisi"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("street", { required: true })}
              />
              {errors.street && <>{errors.street.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Posta kodu"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("post_code", { required: true })}
              />
              {errors.post_code && <>{errors.post_code.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Konum bilgisi"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("location", { required: true })}
              />
              {errors.location && <>{errors.location.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
            <Controller
                control={control}
                name="countryId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                        const countryId: number = parseInt(event.target.value)
                        const country = data.find((k: any) => k.id === countryId)
                        setCity(country?.city ?? [])
                        onChange(event)
                      }}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">Ülke Seçiniz</option>
                      {data.map((k: any) => {
                        return <option value={k.id} key={k.id}>{k.name}</option>
                      })}
                    </Select>
                  </>
                )}
              />
              {errors.countryId && <>{errors.countryId.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
            <Controller
                control={control}
                name="cityId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">Şehir Seçiniz</option>
                      {city?.map((k:any)=> {
                        return <option value={k.id} key={k.id}>{k.name}</option>
                      })}
                    </Select>
                  </>
                )}
              />
              {errors.cityId && <>{errors.cityId.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
            <Controller
                control={control}
                name="districtId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">İlçe Seçiniz</option>
                    </Select>
                  </>
                )}
              />
              {errors.addressType && <>{errors.addressType.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
            <Controller
                control={control}
                name="townId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">Mahalle Seçiniz</option>
                    </Select>
                  </>
                )}
              />
              {errors.addressType && <>{errors.addressType.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
            <Controller
                control={control}
                name="addressType"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">Adres Tipi</option>
                      <option value={addressType.HOME}>{addressType.HOME}</option>
                      <option value={addressType.JOB}>{addressType.JOB}</option>
                    </Select>
                  </>
                )}
              />
              {errors.addressType && <>{errors.addressType.message}</>}
            </div>
          </div>
          <div className="text-center">
            <button type="submit">Gönder</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Address;
