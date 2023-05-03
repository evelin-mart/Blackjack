# Blackjack classic

## Deploy

https://blackjack-4bj.pages.dev

## Stack of technologies

-   React
-   Redux toolkit
-   Typescript
-   Vite
-   jsrsasign
-   Ant Design
-   css modules

## Specification

### **Main Page**

---

-   contain game rules and button Play
    -   button redirect authorized user to Lobby. Unauthorized user is redirected to the Sign In page.

### **Header**

---

-   link to the main page
-   link to Sign In for unauthorized user
-   link to Lobby, Profile and Log Out button for authorized user

### **Sign in / Sign up pages**

---

-   Sign Up form contains:
    -   username text input (check for length to be more than 3)
    -   password input (length >= 5, numbers and caps)
    -   confirm password input
    -   currency selection
-   after registration user gets JWT token that contains secure data
-   user data is saved in local storage
-   Sign In form contains username and password
    -   on submit tries to get token from local storage and compare the data
-   authorization has error handling to prevent the app from crashing
-   if player doesn't log out, he'll stay logged in even if reboot the page (authorization on load)
-   data in local storage actualizes on window unload or on Log out (middleware is used)
-   after successful authorization user is redirected to Lobby

### **Profile**

---

-   contain table with available currencies selection and button to top up the balance
-   button to update password
-   button to delete account

### **Lobby**

---

-   contain available tables with current currency and minimum bet

### **Footer in the game**

---

-   current currency
-   balance
-   total bet
-   exit (Lobby)

### **Game field**

---

-   7 free seats, player can take or leave each of them
-   player loses all his seats if leaves the table
-   there is blackjack count near the player's nickname, but if he leaves this seat, hi will lose it
-   if player decides to leave the table during the game, hi will lose his bets
-   buttons with 1, 5, 10, 25, 100 chips, chips can be added multiple times, if there is enough money
-   buttons to repeat/undo bets
-   button to accept bets
-   button X to free up seat
-   taken seats is saved for the next game
-   check for blackjack after dealing and mark them
-   pointer on playing seat
-   player is suggested to make a decision

### **Rules**

---

-   six-deck game (312 cards), standard 52-card pack is used
-   red card is placed near the middle of the deck, the deck will be shuffled after current deal if the red card is reached
-   player is able to hit or stand
-   player is able to split pair once for a one seat. The amount of the original bet then goes on the other card. The payoff for blackjack in this case stays the same.
-   player is able to double down if he hasn't hit so far
-   Ace is eleven by default but when it's too much it turns into one automatically
-   if the player goes bust, he has already lost his wager, even if the dealer goes bust as well
-   dealer must hit on 16 and stay at 17
-   if both dealer and player have blackjack the payoff wil be 1 : 1


---

    For Evolution TS Bootcamp '23
