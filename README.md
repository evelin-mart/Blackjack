# Blackjack classic

## Specification

### **Lobby**

---

* for unregistered user there is buttons Register, Log in
  * click on Register opens register form. Form contains: 
    * username text input (check for length to be more than 3)
    * password input (length >= 8, numbers and caps)
    * checkbox confirm the user is over 18yo
  * after registration save user data to local storage
  * redirect to wallet settings
    * select currency
    * button to add balance (20 for start)
  * settings are saved in local storage
  * click on Log in opens login form with username and password. On submit tries get data from local storage and compare it.
* for registered user 3 buttons:
  * play
  * wallet
  * log out
* user balance is displayed on the top

### **Header**

---

- game title
- greeting ("Welcome \_ _username_")
- min\max bet
- sounds toggler
- (opt) chat

### **Footer**

---

- currency toggler
- balance
- total bet / last win amount 
- exit (Lobby)

### **Game field**

---

- 7 free seats
- 15 sec to choose seat and bet
  - buttons to repeat/undo bets
  - if bets are done repeat button changes to double bets button
  - buttons with 1, 5, 10, 25, 100, 500 chips
  - button X to free up seat
  - click on seat adds chosen bet (min bet by default) to all user seats
  - taken seats is saved for the next game
  - 5 sec before closing the "place your bets" message changes to "bets closing", color of timer changes from green to orange. After closing the message will be " bets closed", and after few time it will be " bets accepted"
- after bets closing all empty seats are occupied by AI
  - AI acts the same as dealer
  - AI bets are random numbers
- animation of cards being dealt
- check for blackjack on animation end
  - block blackjack seats and mark them
- pointer on current player
- player is suggested to make a decision within 10 sec
- animation of dealing cards

### **Blackjack rules**

---

- the six-deck game (312 cards), standard 52-card pack is used, deck changes every 3 games

- The Play

  The player to the left goes first and must decide whether to "stand" (not ask for another card) or "hit" (ask for another card in an attempt to get closer to a count of 21, or even hit 21 exactly). Thus, a player may stand on the two cards originally dealt to them, or they may ask the dealer for additional cards, one at a time, until deciding to stand on the total (if it is 21 or under), or goes "bust" (if it is over 21). In the latter case, the player loses and the dealer collects the bet wagered. The dealer then turns to the next player to their left and serves them in the same manner.

  The combination of an ace with a card other than a ten-card is known as a "soft hand," because the player can count the ace as a 1 or 11, and either draw cards or not. For example with a "soft 17" (an ace and a 6), the total is 7 or 17. While a count of 17 is a good hand, the player may wish to draw for a higher total. If the draw creates a bust hand by counting the ace as an 11, the player simply counts the ace as a 1 and continues playing by standing or "hitting" (asking the dealer for additional cards, one at a time).

- Splitting Pairs:

  If a player's first two cards are of the same denomination, such as two jacks or two sixes, they may choose to treat them as two separate hands when their turn comes around. The amount of the original bet then goes on one of the cards, and an equal amount must be placed as a bet on the other card. The player first plays the hand to their left by standing or hitting one or more times; only then is the hand to the right played. The two hands are thus treated separately, and the dealer settles with each on its own merits. With a pair of aces, the player is given one card for each ace and may not draw again. Also, if a ten-card is dealt to one of these aces, the payoff is equal to the bet (not one and one-half to one, as with a blackjack at any other time).

- Settlement

  A bet once paid and collected is never returned. Thus, one key advantage to the dealer is that the player goes first. If the player goes bust, they have already lost their wager, even if the dealer goes bust as well. If the dealer goes over 21, the dealer pays each player who has stood the amount of that player's bet. If the dealer stands at 21 or less, the dealer pays the bet of any player having a higher total (not exceeding 21) and collects the bet of any player having a lower total. If there is a stand-off (a player having the same total as the dealer), no chips are paid out or collected.

- The Dealer's Play

  When the dealer has served every player, the dealers face-down card is turned up. If the total is 17 or more, it must stand. If the total is 16 or under, they must take a card. The dealer must continue to take cards until the total is 17 or more, at which point the dealer must stand. If the dealer has an ace, and counting it as 11 would bring the total to 17 or more (but not over 21), the dealer must count the ace as 11 and stand. The dealer's decisions, then, are automatic on all plays, whereas the player always has the option of taking one or more cards.

Extra points:

- Doubling Down

  Another option open to the player is doubling their bet when the original two cards dealt total 9, 10, or 11. When the player's turn comes, they place a bet equal to the original bet, and the dealer gives the player just one card, which is placed face down and is not turned up until the bets are settled at the end of the hand. With two fives, the player may split a pair, double down, or just play the hand in the regular way. Note that the dealer does not have the option of splitting or doubling down.

- Insurance

  When the dealer's face-up card is an ace, any of the players may make a side bet of up to half the original bet that the dealer's face-down card is a ten-card, and thus a blackjack for the house. Once all such side bets are placed, the dealer looks at the hole card. If it is a ten-card, it is turned up, and those players who have made the insurance bet win and are paid double the amount of their half-bet - a 2 to 1 payoff. When a blackjack occurs for the dealer, of course, the hand is over, and the players' main bets are collected - unless a player also has blackjack, in which case it is a stand-off. Insurance is invariably not a good proposition for the player, unless they are quite sure that there are an unusually high number of ten-cards still left undealt.
