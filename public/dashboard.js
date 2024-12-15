const descriptionInput = document.getElementById('description');
const charCountDisplay = document.getElementById('charCount');

descriptionInput.addEventListener('input', function() {
    const remainingChars = 255 - descriptionInput.value.length;
    charCountDisplay.textContent = `${remainingChars} characters remaining`;
});

function setTransactionType(type) {
    document.getElementById('transactionType').value = type;
}

// Function to handle delete button click
    document.addEventListener('DOMContentLoaded', () => {
        const deleteButtons = document.querySelectorAll('.delete-button');

        deleteButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const transactionId = event.target.getAttribute('data-id');

                // Confirm deletion
                const confirmDelete = confirm("Are you sure you want to delete this transaction?");
                if (confirmDelete) {
                    try {
                        // Send a request to delete the transaction from the server
                        const response = await fetch(`/transactions/${transactionId}`, {
                            method: 'DELETE',
                        });

                        if (response.ok) {
                            // Remove the row from the UI
                            event.target.closest('tr').remove();
                        } else {
                            alert("Failed to delete the transaction.");
                        }
                    } catch (error) {
                        console.error("Error deleting transaction:", error);
                        alert("An error occurred while deleting the transaction.");
                    }
                }
            });
        });
    });