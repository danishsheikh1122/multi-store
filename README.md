## Project setup and initialization

- date 25-07-24
- created next app and addeed shadcn lib
- by default (root) folder can contians landing page

## Auth with clerk

- clerk auth initiated
- signup and signin page is created

## created a store zustand is used

- we need to create a dialog and to manage its state globally we used zustand
- first we create a dialog (basically a cmp) then we create zustand store (basically a hook)to manage its state onOpen and onClose and after that we created a modal store where we finally render the dialog with use of zustand state and the we have created providers>modal-provider.tsx to make the app uncrashable when csr and ssr will occur.

## created store changer component

- we've used shadcn comboboox to immplement this component and user can create a new store and the automatically gets redirected to the store dashborad

## billboard component created

- all routes of billboard component and ui also created

## categories component created

- all routes of categories component and ui also created

## created sizes

- all routes of sizes component and ui also created

## created colors

- all routes of colors component and ui also created

## wrapping up admin store
- date 31-07-24