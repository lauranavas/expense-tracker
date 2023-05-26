import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiArrowLeftCircle } from "react-icons/fi";

import { getCategories } from "../firebase/categories";
import { getPaymentMethods } from "../firebase/paymentMethods";
import { addExpense } from "../firebase/expenses";

const addTransactionSchema = yup.object({
  amount: yup.number().positive().moreThan(0).required(),
  category: yup.string().required(),
  date: yup.date().max(new Date()).required(),
  description: yup.string().trim(),
  expense: yup.string().required().trim(),
  "payment-method": yup.string().required(),
});

const CreateTransaction = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    resolver: yupResolver(addTransactionSchema),
    defaultValues: {
      amount: 0.01,
      category: "",
      date: new Date(),
      description: "",
      expense: "",
      "payment-method": "",
    },
  });

  const queryClient = useQueryClient();

  const { isLoading: isLoadingCategories, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const { isLoading: isLoadingPaymentMethods, data: paymentMethods } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: () => getPaymentMethods(),
  });

  const addTransactionMutation = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  function saveForm(data) {
    addTransactionMutation.mutate(data);
    reset();
  }

  return (
    <div className='flex flex-col justify-center items-start'>
      <Link to='/' className='inline-flex items-center mb-3 self-start'>
        <FiArrowLeftCircle className='mr-1' />
        Go back
      </Link>
      <form className='w-full bg-pink-100 rounded-xl px-3' onSubmit={handleSubmit(saveForm)}>
      <h1 className='text-4xl font-bold mb-4 ml-3 mt-3'>New expense</h1>
        <div className='form-item'>
          <label htmlFor='expense' className='form-label'>
            Short description
          </label>
          <div className='form-control'>
            <input type='text' {...register("expense")} id='expense' />
            {errors.expense?.message && <p>{errors.expense?.message}</p>}
          </div>
        </div>

        <div className='form-item'>
          <label htmlFor='amount' className='form-label'>
            Amount
          </label>
          <div className='form-control'>
            <input type='number' step='0.01' {...register("amount")} id='amount' />

            {errors.amount?.message && <p>{errors.amount?.message}</p>}
          </div>
        </div>
        <div className='form-item'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <div className='form-control'>
            <textarea {...register("description")} id='description' rows='2'></textarea>
            {errors.description?.message && <p>{errors.description?.message}</p>}
          </div>
        </div>

        <div className='form-item'>
          <label htmlFor='date' className='form-label'>
            Date
          </label>
          <div className='form-control'>
            <input type='date' {...register("date")} id='date' />
            {errors.date?.message && <p>{errors.date?.message}</p>}
          </div>
        </div>

        <div className='form-item'>
          <label htmlFor='category' className='form-label'>
            Category
          </label>
          <div className='form-control'>
            <select {...register("category")} id='category' disabled={isLoadingCategories}>
              <option value='' disabled>
                Select a category
              </option>
              {categories?.length &&
                categories.map((category, index) => (
                  <option key={index} value={category.category}>
                    {category.category}
                  </option>
                ))}
            </select>
            {errors.category?.message && <p>{errors.category?.message}</p>}
          </div>
        </div>

        <div className='form-item'>
          <label htmlFor='payment-method' className='form-label'>
            Payment method
          </label>
          <div className='form-control'>
            <select
              {...register("payment-method")}
              id='payment-method'
              defaultValue=''
              disabled={isLoadingPaymentMethods}
            >
              <option value='' disabled>
                Select a payment method
              </option>
              {paymentMethods?.length &&
                paymentMethods.map((paymentMethod, index) => (
                  <option key={index} value={paymentMethod["payment-method"]}>
                    {paymentMethod["payment-method"]}
                  </option>
                ))}
            </select>
            {errors["payment-method"]?.message && <p>{errors["payment-method"]?.message}</p>}
          </div>
        </div>

        <button className="w-full mt-3 mb-3 py-3 rounded-2xl text-center bg-pink-600 text-white font-bold text-xl hover:bg-pink-500" type='submit' disabled={isSubmitting}>
          Add expense
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;
