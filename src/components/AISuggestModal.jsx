import "../styles/AISuggestModal.css";
import { useState } from "react";

const AISuggestModal = ({
    isOpen,
    suggestion,
    onClose,
    onAssignToday,
    onTryAgain
}) => {
    const [refineText, setRefineText] = useState("");
    const startSpeechRecognition = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setRefineText(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech error:", event.error);
        };

        recognition.start();
    };

    if (!isOpen) return null;

    return (
        <div className="ai-backdrop" onClick={onClose}>
            <div
                className="ai-container"
                onClick={(e) => e.stopPropagation()}
            >
                {/* TOP SECTION */}
                <div className="ai-top">
                    <div className="ai-header">
                        <span className="material-symbols-outlined ai-icon">
                            auto_awesome
                        </span>
                        <span className="ai-label">
                            Suggested for You
                        </span>
                    </div>

                    <div className="ai-suggestion">
                        <div className="ai-image">
                            {suggestion?.image && (
                                <img src={suggestion.image} alt={suggestion.title} />
                            )}
                        </div>

                        <div className="ai-info">
                            <div className="ai-badge">
                                {suggestion?.badge || "AI PICK"}
                            </div>

                            <h2>{suggestion?.title}</h2>
                            <p>{suggestion?.description}</p>
                        </div>
                    </div>
                </div>

                {/* REFINE SECTION */}
                <div className="ai-refine">
                    <p className="ai-refine-label">
                        Refine with AI
                    </p>

                    <button className="ai-mic-btn" onClick={startSpeechRecognition}>
                        <span className="material-symbols-outlined">
                            mic
                        </span>
                    </button>

                    <div className="ai-input-wrapper">
                        <input
                            placeholder="Make it spicy..."
                            value={refineText}
                            onChange={(e) => setRefineText(e.target.value)}
                        />
                        <button onClick={() => {
                            if (!refineText.trim()) return;
                            onTryAgain(refineText);
                            setRefineText("");
                        }}>
                            <span className="material-symbols-outlined">
                                send
                            </span>
                        </button>
                    </div>

                    <div className="ai-actions">
                        <button
                            className="ai-assign"
                            onClick={onAssignToday}
                        >
                            Assign to Today
                        </button>

                        <button
                            className="ai-try"
                            onClick={() => onTryAgain(refineText)}
                        >
                            Try Something Else
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AISuggestModal;