import * as yup from "yup";
import { parse, isValid as dateFnsIsValid, format } from "date-fns";
import { ptBR } from "date-fns/locale";

const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;

export const transformDateStringToDate = (
  originalValue: any,
  originalObject: any
) => {
  const parsedDate = parse(originalValue, "dd/MM/yyyy", new Date());

  if (!dateFnsIsValid(parsedDate)) {
    throw new yup.ValidationError(
      "Invalid date format",
      originalObject.path,
      "date.invalid"
    );
  }

  return parsedDate;
};

export const transformDateToFormattedString = (originalValue: any) => {
  if (dateFnsIsValid(originalValue)) {
    return format(originalValue, "dd/MM/yyyy", { locale: ptBR });
  }

  return originalValue;
};

const dateSchema = yup
  .mixed()
  .test("isValidDate", "Invalid date format", function (value) {
    if (!value) {
      return true;
    }

    if (typeof value === "string" && !dateFormat.test(value)) {
      return this.createError({
        path: this.path!,
        message: "Invalid date format",
      });
    }

    if (typeof value === "string") {
      this.parent[this.path!] = transformDateStringToDate(value, this);
    }

    return true;
  })
  .transform(transformDateToFormattedString);

export const createValidationSchemaHospital = yup.object({
  nameHospital: yup.string().min(5).required("Name is required"),
  address: yup.string().min(5).required("Address is required"),
  beds: yup.string().required("Leitos is required"),
  availableBeds: yup.string().required("Available beds is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const createValidationSchemaPaciente = yup.object({
  name: yup.string().min(5).required("Name is required"),
  cpf: yup
    .string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Invalid CPF format")
    .required("CPF is required"),
    birth: dateSchema.required("Birth is required"),
  gender: yup.string().required("Gender is required"),
  dateEntry: dateSchema.required("Date Entry is required"),
});

export const createValidationSchemaStock = yup.object({
  name: yup.string().min(5).required("Name is required"),
  description: yup.string().required("Description is required"),
  amount: yup.number().required("Amount is required"),
});
