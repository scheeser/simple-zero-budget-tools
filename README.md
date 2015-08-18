# Overview
Tools that make it easier to deal with a zero based cash budget. The intent is to ease some of the pain points when dealing with the budget forms and concepts from Dave Ramsey's [The Total Money Makeover](http://www.daveramsey.com/fpu/home/).

## Usage
- [http://scheeser.github.io/simple-zero-budget-tools/](http://scheeser.github.io/simple-zero-budget-tools/)
or
- Clone the repository
- Checkout the `gh-pages` branch
- Open up the index.html file for each tool in your browser.

## Cash Breakdown
Takes a set of cash amounts and breaks each one down into the denominations of US currency that add up to the specified amount. The sum of all number entered will be kept as well as the total count of each denomination. These totals are useful when making withdrawals at the bank for those budget categories that are spent using cash.

Options:
- Exclude larger denominations if you don't want to carry larger bills.
- Split the amount entered so the cash received can be shared evenly between two people.
    - $50 would be broken up as 2 x $20 and 2x$5 instead of a single $50 bill.
    - Odd numbers will not be split into even increments since the tool isn't intended to support fractions of dollars.
