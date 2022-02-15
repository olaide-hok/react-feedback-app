import { createContext, useState } from "react";
import { nanoid } from 'nanoid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: "This item is from context",
            rating: 10
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // Delete Feedback
    const deleteFeedback = (id) => {
        if(window.confirm("Are you sure you want to delete?")) {
          setFeedback(feedback.filter((item) => item.id !== id))
        }        
    }

    // Add Feedback 
    const addFeedback = (newFeedback) => {
        newFeedback.id = nanoid()
        setFeedback([newFeedback, ...feedback]);
    }

    // Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // Update Feedback Item
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem } : item))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext