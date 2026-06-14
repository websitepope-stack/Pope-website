import { getDioceses } from "@/lib/api";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const dioceses = await getDioceses();
  const hasDiocese = dioceses && dioceses.length > 0;
  
  return <NavbarClient hasDiocese={hasDiocese} />;
}
