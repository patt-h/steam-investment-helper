import './deleteitem.css';

const DeleteItem = ({open, onClose, itemId, itemName}) => {
    const handleDelete = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/delete/${itemId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            window.location.reload();
          } 
          else {
            console.error('Error while deleting item:', response.statusText);
          }
        } catch (error) {
          console.error('Error while deleting item:', error);
        }
      };

    if (!open) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="modal-container">
                <div className="modal-content">
                    <h1>Are you sure you want to remove this item?</h1>
                    <h2>{itemName}</h2>
                    <div className="button-container">
                        <button className="confirm-button" onClick={handleDelete}>Delete</button>
                        <button className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteItem;