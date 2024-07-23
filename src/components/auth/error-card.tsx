import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


export const ErrorCard = () => {
  return (

      <div className="w-full flex justify-center items-center">
      <ExclamationTriangleIcon className="text-destructive" />
      </div>

  );
};
