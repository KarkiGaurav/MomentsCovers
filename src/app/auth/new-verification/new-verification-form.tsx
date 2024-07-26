"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { newVerification } from "@/app/auth/new-verification/actions";

export const NewVerificationForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);


  if(success) {
    router.push(`/auth/login`)
  }
  return (
    // <CardWrapper
    //   headerLabel="Confirming your verification"
    //   backButtonLabel="Back to login"
    //   backButtonHref="/auth/login"
    // >
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <BeatLoader />
        )}
        <FormSuccess message={success} />
        {!success && (
          <FormError message={error} />
        )}
      </div>
    // </CardWrapper>
  )
}