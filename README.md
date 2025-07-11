

# Introduction

The goal is to make a real game — one that people actually *want* to play.

Not a piece of junk thrown together just to meet some homework requirement. Not one of those web toys that grabs your attention for ten seconds and then becomes boring.

As student, we don’t yet have the skills to create a great game through flashy visuals. So, how can we attract players *without* fancy graphics? My answer is: through **engaging gameplay**.

Think about this: how can we get someone to focus on a game while waiting for food or killing ten minutes before class? I need to find a game mechanic that works — something visually simple, but mechanically rich enough to keep players hooked.

That’s where **clicker games** come in.

Let’s be honest: innovation isn’t the goal. In the last 30 years, every game genius has already explored nearly every possible concept. We can’t create something completely new and instantly successful. So, I believe there’s nothing wrong with building around proven clicker mechanics.

---

# Mechanics

## Systems

| Mechanic      | Active Click       | Auto Click       | Active Event                | Auto Event          | Consumable Event                |
| ------------- | ------------------ | ---------------- | --------------------------- | ------------------- | ------------------------------- |
| Description   | Manual click       | Automatic clicks | Triggered every 100 clicks  | Triggered over time | Short-term boost effects        |
| Unlock Method | Default            | Buy with water   | Unlock through total clicks | Buy with water      | Paid feature (supports charity) |
| Upgrades      | Upgrade with water | No upgrades      | Upgrade with water          | No upgrades         | No upgrades                     |

---

## 👆 Active Click

**“One click, one drop. Small streams make great rivers!”**

In this world, every click brings a drop of hopeful water.

* Earn water with every click
* Spend water to upgrade click strength

| Level | Water per Click | Upgrade Cost     | ROI (at 6 clicks/sec) |
| ----- | --------------- | ---------------- | --------------------- |
| 1     | 1 g             | 100 g            | 2.8 sec               |
| 2     | 10 g            | 800 g            | 13.3 sec              |
| 3     | 100 g           | 8 kg             | 13.3 sec              |
| 4     | 1 kg            | 120 kg           | 20 sec                |
| 5     | 10 kg           | 2 t              | 33 sec                |
| 6     | 100 kg          | 40 t             | 66 sec                |
| 7     | 1 t             | 1 K-t            | 166 sec               |
| 8     | 10 t            | 30 K-t           | 250 sec               |
| 9     | 100 t           | 1 M-t            | 1660 sec              |
| 10    | 1 K-t           | Requires Rebirth | —                     |

---

## 🖱️ Auto Click

**“Flow without effort, a never-ending stream!”**

No more manual clicking — build water systems to generate resources passively!

* Produces water automatically, even offline
* Buy in bulk; refunds at original price

| Level | System Name | Output/sec | Price  | ROI (seconds) |
| ----- | ----------- | ---------- | ------ | ------------- |
| 1     | Faucet      | 150 g      | 4.5 kg | 30 sec        |
| 2     | Bathtub     | 400 g      | 12 kg  | 30 sec        |
| 3     | Hydrant     | 2 kg       | 60 kg  | 30 sec        |
| 4     | Stream      | 25 kg      | 3 t    | 120 sec       |
| 5     | Waterfall   | 100 kg     | 12 t   | 120 sec       |
| 6     | River       | 2 t        | 480 t  | 240 sec       |
| 7     | Canal       | 20 t       | 6 K-t  | 300 sec       |

---

## 🌧️ Auto Event

**“Rain from the heavens, sometimes drought, sometimes flood.”**

Nature’s gift must not be ignored. After unlocking the Rain System, the sky will randomly send down blessings once every minute!

* Triggers automatically every minute
* Each event randomly picks from unlocked rain types

| Level | Type           | Duration | Output/sec | Total Output | Price  | ROI (minutes) |
| ----- | -------------- | -------- | ---------- | ------------ | ------ | ------------- |
| 1     | Light Rain     | 5 s      | 1 kg       | 5 kg         | 100 kg | 20 min        |
| 2     | Medium Rain    | 5 s      | 10 kg      | 50 kg        | 1 t    | 20 min        |
| 3     | Heavy Rain     | 5 s      | 100 kg     | 500 kg       | 10 t   | 20 min        |
| 4     | Thunderstorm   | 3 s      | 500 kg     | 1.5 t        | 30 t   | 20 min        |
| 5     | Rainstorm      | 5 s      | 2 t        | 10 t         | 120 t  | 30 min        |
| 6     | Prolonged Rain | 10 s     | 3 t        | 30 t         | 360 t  | 30 min        |
| 7     | Monsoon        | 50 s     | 5 t        | 300 t        | 3 K-t  | 60 min        |

---

## 💯 Active Event

**“When water overflows, unleash the surge!”**

Every 100 clicks unleashes a powerful burst of stored water!

* Automatically triggers after every 100 clicks
* Upgrade for more powerful bursts

| Level | Name            | Burst Output | Upgrade Cost | Unlock Clicks |
| ----- | --------------- | ------------ | ------------ | ------------- |
| 1     | Drop            | 1 g          | 1 ml         | 0             |
| 2     | Glass           | 500 g        | 500 ml       | 400           |
| 3     | Bottle          | 2 kg         | 2 L          | 800           |
| 4     | Bucket          | 20 kg        | 20 L         | 1200          |
| 5     | Big Bucket      | 200 kg       | 200 L        | 1600          |
| 6     | Water Tank      | 1 t          | 1 t          | 2000          |
| 7     | Water Tower     | 50 t         | 50 t         | 2400          |
| 8     | Reservoir       | 1 K-t        | 1 K-t        | 2800          |
| 9     | Lake            | 50 K-t       | 50 K-t       | 3200          |
| 10    | Sea             | 1 M-t        | 1 M-t        | 3600          |
| 11    | Ocean (Rebirth) | 1 B-t        | 1 B-t        | 4000          |

---

# Other Systems

## Consumable Events

| Event Type          |
| ------------------- |
| Pipe Leak           |
| Pump Failure        |
| Sudden Rainfall     |
| Typhoon             |
| Flood               |
| Hailstorm           |
| Hydropower Plant    |
| Drought Warning     |
| Water Contamination |

---

## Interface Units

Units are always displayed in English, regardless of language.

| Value           | Unit                                           |
| --------------- | ---------------------------------------------- |
| 1–999           | g                                              |
| 1,000–99,999    | kg                                             |
| 100,000–999,999 | t                                              |
| 1,000,000+      | Use scientific notation (e.g., 1.555 × 10^6 t) |

---

## Achievement System

* Opening a message-in-a-bottle costs 1% of your current water, minimum 1 ton
* Unlocks after first rebirth
* “You’ve found a bottle...”

| Name                  | Rarity    | Description                                                                   |
| --------------------- | --------- | ----------------------------------------------------------------------------- |
| 💨 Steam              | Common    | Once water, now a cloud. Memories evaporate but may return as rain.           |
| 🧊 Ice                | Common    | Cold but calm. May be used to cool or store systems.                          |
| 💧 Distilled Water    | Common    | Ultra-pure, tasteless water. A scientist's favorite.                          |
| 🥛 Milk               | Common    | ...This isn’t water. Who linked the kitchen?!                                 |
| 🪨 Mud Water          | Common    | Looks like water but better not get close. Possibly useful — or bug-infested. |
| 🧴 Alcohol            | Common    | Not water, but disinfects. May boost devices. Avoid flames!                   |
| 🫧 “Dry” Water        | Rare      | A theoretical material — water that doesn’t get things wet. Maybe.            |
| 🫗 Diluted Water      | Rare      | Something’s added. Everything looks the same, yet different.                  |
| 🧪 Concentrated Water | Rare      | Bitter and dense. May fuel certain upgrades. Do not drink.                    |
| ⚛️ Heavy Water        | Rare      | Used in nuclear reactions. Might unlock future “water reactors.”              |
| ✝️ Holy Water         | Legendary | Purifies all. May trigger miracle events or enhance systems.                  |
| ♾️ Infinite Water     | Legendary | Mythical. Grants slow but infinite water flow permanently.                    |

---

## Rebirth System

When total water reaches **100 M-t**, the achievement system on the right activates, prompting rebirth.

Clicking rebirth shows an explanation at the top of the screen. If the player accepts, **all progress and resources reset**, but higher-level upgrades and the achievement system become permanently available.

