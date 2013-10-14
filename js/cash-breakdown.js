(function (window) {
    var denominations = [50, 20, 10, 5];

    /**
     * Return an array inidcating the quantity of each denomination of currency from the
     * denominationIdex to the denominations length that add up to the amount provided.
     * Excluded any denominations specified by the exclusion array.
     */
    function calcBreakdown(amount, denominationIndex, excludeIndex) {
        var quotient, remainder;

        // When out of denominations 1's only bill left return the remaining amount.
        if (denominationIndex === denominations.length) {
            return [amount];
        }

        // If the index is specified as excluded set whole balance as remainder.
        if (excludeIndex[denominationIndex]) {
            quotient = 0;
            remainder = amount;
        } else {
            quotient = Math.floor(amount / denominations[denominationIndex]);
            remainder = amount % denominations[denominationIndex];
        }

        return [quotient].concat(calcBreakdown(remainder, denominationIndex + 1, excludeIndex));
    }

    /**
     * Return a string representation of a table cell: <td>TEXT</td>
     */
    function createCell(text) {
        return ['<td>', text, '</td>'].join('');
    }

    /**
     * Add to the sum each of each total cell in the total table row using the given data.
     * Optionally subtract the newRowData if remove provided.
     */
    function updateTotals(newRowData, remove) {
        remove = typeof remove === 'boolean' ? remove : false;

        var $totalCells = $('#totalRow .total'), $curTotalCell;

        $totalCells.each(function (index) {
            $curTotalCell = $(this);
            if (remove) {
                $curTotalCell.text(parseInt($curTotalCell.text(), 10) - newRowData[index]);
            } else {
                $curTotalCell.text(parseInt($curTotalCell.text(), 10) + newRowData[index]);
            }
        });
    }

    $(function () {
        $('#description').focus();

        $('body').on('click', '#calculate', function (event) {
            var amount = parseInt($('#amount').val(), 10),
                splits = [],
                breakdown,
                splitBreakdown,
                $descriptionInput,
                $newRow,
                excludeIndex = [],
                i;

            // Prevent submission of form.
            event.preventDefault();

            if (isNaN(amount)) {
                // TODO: Do something better here.
                alert('Not an intenger.');
                return;
            }

            // Deterime if any denominations are excluded
            $('.exclude:checked').each(function (index) {
                excludeIndex[$(this).val()] = true;
            });

            // Check if the amount should be split evenly and update amount and split amount
            if ($('.split:checked').size() === 1) {
                // Maybe we split more that two ways at some point in the future
                splits[0] = Math.floor(amount / 2);
                splits[1] = splits[0] + (amount % 2);

                // For each entry in the split the breakdown needs calculated
                breakdown = calcBreakdown(splits[0], 0, excludeIndex);
                splitBreakdown = calcBreakdown(splits[1], 0, excludeIndex);
                for (i = 0; i < splitBreakdown.length; i++) {
                    breakdown[i] = breakdown[i] + splitBreakdown[i];
                }
            } else {
                // No split is defined update the breakdown with the provided data
                breakdown = calcBreakdown(amount, 0, excludeIndex);
            }

            // Take the cash breakdown and update the table with the latest values
            $descriptionInput = $('#description');
            $newRow = $('<tr>');
            $newRow.append(createCell($descriptionInput.val()))
                .append(createCell(amount));
            $('.denomination').each(function (index) {
                $newRow.append(createCell(breakdown[index]));
            });

            $newRow.append(createCell('<i class="delete glyphicon glyphicon-remove"></i>')).insertBefore('#totalRow');
            updateTotals([amount].concat(breakdown));

            // Clear the inputs and reset the focus
            $('form')[0].reset();
            $descriptionInput.focus();
        });

        $('body').on('click', '.delete', function (event) {
            var $removeRow = $(event.target).closest('tr'), removeData = [];

            $removeRow.children('td').not(':first').not(':last').each(function (index) {
                removeData[index] = parseInt($(this).text(), 10);
            });

            updateTotals(removeData, true);

            $removeRow.remove();
        });
    });
}(this));