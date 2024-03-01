import { formatCurrency } from "../scripts/utils/money.js";

if (formatCurrency(2595.1)==="25.95"){
    console.log("passed")
}else {
    console.log("failed")
}