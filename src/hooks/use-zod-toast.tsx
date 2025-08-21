import { toast } from "sonner";
import { FieldErrors } from "react-hook-form";

type FlattenedError = {
  path: string;
  message: string;
};

export function useZodToastErrors() {
  const showToastErrors = (
    errors: FieldErrors,
    fallbackMessage = "An error occurred while saving the configuration."
  ): FlattenedError[] => {
    const flattenErrors = (
      errors: FieldErrors,
      prefix = ""
    ): FlattenedError[] => {
      return Object.entries(errors).flatMap(([key, value]) => {
        const path = prefix ? `${prefix}.${key}` : key;

        if (value?.message) {
          return [{ path, message: String(value.message) }];
        }

        if (typeof value === "object") {
          return flattenErrors(value as FieldErrors, path);
        }

        return [];
      });
    };

    const flat = flattenErrors(errors);

    toast("Whoops! Something went wrong", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {flat[0]?.message ?? fallbackMessage}
          </code>
        </pre>
      ),
    });

    return flat;
  };

  return showToastErrors;
}

export const toastLog = (
  payload: any,
  title = "Whoops! Something went wrong"
) =>
  toast(title, {
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 whitespace-pre-wrap">
        <code className="text-white">{payload}</code>
      </pre>
    ),
  });
