import { FormattedNumber } from "react-intl";

export const formatCurrency = (value) => (
  <FormattedNumber value={value} style="currency" currency="EUR" />
);
export const formatCurrencyWithIntl = (value, intl) =>
  intl.formatNumber(value, { style: "currency", currency: "EUR" });
export const formatNumberWithIntl = (value, intl) =>
  intl.formatNumber(value, { style: "decimal" });
