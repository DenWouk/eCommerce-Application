// import { GetServerSideProps } from "next";
// import { useCartContext } from "../context/CartContext";
// import isAuthorized from "../helpers/auth";
// import cartModel from "../helpers/commercetools/cart/cartModel";
// import { AuthProps } from "../pages";
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// type CartItemProps = {
//     id:string;
//     quantity:number;
// }
// export default CartItem({id, quantity}: CartItemProps){
//     const {removeItems} = useCartContext();
//    return (
//     <div>0</div>
//    )
// }
// export const getServerSideProps: GetServerSideProps<AuthProps> = async ({ req }) => {
//     const authorized = await isAuthorized({ req });
//     try {
//       const customerResponse = await cartModel.getCart(req);
//       return { props: { authorized, customer: customerResponse.body } };
//     } catch {
//       return {
//         notFound: true,
//       };
//     }
//   };
  