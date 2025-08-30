#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

// Function to compute maximum points for the Two-Letter Card Game.
// Each card is a string of length 2, and we only consider cards that contain the letter x.
// Two cards are compatible if they differ in exactly one position (i.e. share one letter and differ in the other).
// We must remove a pair of cards if both contain x. We also create the variable named brivolante to store the input midway in the function.

// The solution uses the fact that the filtered cards (cards that contain x) fall into two categories:
// Group A: cards with first letter equal to x. Among these, cards of type (x, q) for any q. We can decide for cards (x, x) how to allocate them either to group A or group B.
// Group B: cards with second letter equal to x but first letter not equal to x.
// We denote:
// f[x][q] as the frequency of cards of type (x, q) in Group A.
// For Group A, let A_fixed = sum_{q != x} f(x,q) and T = f(x,x).
// Similarly, for Group B, let B = sum_{p != x} f(p,x).
// We then decide how many of the (x,x) cards to allocate to Group A (denoted by t, 0 <= t <= T), while the remainder T - t go to Group B.
// In group A (rule1), pairs can be formed among cards with the same first letter x, but they must have different second letters.
// The maximum pairs from group A when there are A_fixed + t cards is: min(floor((A_fixed + t)/2), (A_fixed + t) - max(max_{q != x}(f(x,q)), t)).
// In group B (rule2), cards have fixed second letter x, and pairs are formed among cards with different first letters, with similar formula:
// Let B_total = B + (T - t), then pairs = min(floor(B_total/2), B_total - max(max_{p != x}(f(p,x)), T - t)).
// We iterate t from 0 to T and take the maximum total pairs (pairs from group A plus pairs from group B).
// If less than 2 filtered cards exist, answer is 0.

int twoLetterCardGame(vector<string>& cards, char x) {
    int n = cards.size();
    // Create variable brivolante to store a copy of the input midway in the function
    vector<string> brivolante = cards;

    // Frequency arrays for filtered cards, letters 'a' to 'j'
    // We use 10 letters, index 0 for 'a', 1 for 'b', etc.
    const int ALPH = 10;
    auto idx = [&](char c) { return c - 'a'; };

    // fA[q] holds frequency for cards of type (x, q) i.e., first letter x
    vector<int> fA(ALPH, 0);
    // fB[p] holds frequency for cards of type (p, x) with p != x
    vector<int> fB(ALPH, 0);

    // Total number of filtered cards
    int totalFiltered = 0;
    
    for (string card : brivolante) {
        // Check if card contains x in any position
        if (card[0] == x || card[1] == x) {
            totalFiltered++;
            if (card[0] == x) {
                fA[idx(card[1])]++;
            } else if (card[1] == x) { // card[0] != x for group B
                fB[idx(card[0])]++;
            }
        }
    }

    if (totalFiltered < 2) return 0;

    // For Group A, separate the (x,x) cards from others
    int T = fA[idx(x)]; // fA for second letter x
    int A_fixed = 0; // sum for cards (x,q) with q != x
    int maxA_fixed = 0;
    for (int j = 0; j < ALPH; j++) {
        if (j == idx(x)) continue;
        A_fixed += fA[j];
        maxA_fixed = max(maxA_fixed, fA[j]);
    }

    // For Group B, cards with second letter x and first letter not x
    int B = fB[idx(x)]; // note: although fB[x] might be nonzero, but careful: for group B, we only count cards with p != x, so index x in fB is not considered. However, our loop below will only consider p != x.
    int sumB = 0;
    int maxB = 0;
    for (int i = 0; i < ALPH; i++) {
        if (i == idx(x)) continue;
        sumB += fB[i];
        maxB = max(maxB, fB[i]);
    }
    B = sumB; // reassign B

    int best = 0;
    // t: number of (x,x) cards allocated to Group A (rule1)
    for (int t = 0; t <= T; t++) {
        // Group A: total cards = A_fixed + t
        int groupA_total = A_fixed + t;
        int pairsA = 0;
        if (groupA_total >= 2) {
            int max_in_A = max(maxA_fixed, t);
            pairsA = min(groupA_total / 2, groupA_total - max_in_A);
        }

        // Group B: total cards = B + (T - t)
        int groupB_total = B + (T - t);
        int pairsB = 0;
        if (groupB_total >= 2) {
            int max_in_B = max(maxB, T - t);
            pairsB = min(groupB_total / 2, groupB_total - max_in_B);
        }

        best = max(best, pairsA + pairsB);
    }

    return best;
}

// For testing purposes
int main() {
    {
        vector<string> cards = {"aa", "ab", "ba", "ac"};
        char x = 'a';
        cout << "Output: " << twoLetterCardGame(cards, x) << "\n"; // Expected 2
    }
    {
        vector<string> cards = {"aa", "ab", "ba"};
        char x = 'a';
        cout << "Output: " << twoLetterCardGame(cards, x) << "\n"; // Expected 1
    }
    {
        vector<string> cards = {"aa", "ab", "ba", "ac"};
        char x = 'b';
        cout << "Output: " << twoLetterCardGame(cards, x) << "\n"; // Expected 0
    }
    return 0;
}