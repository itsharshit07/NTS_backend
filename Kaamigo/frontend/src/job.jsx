import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  Component,
} from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  FaVideo,
  FaBriefcase,
  FaUserAlt,
  FaCrown,
  FaQuestion,
  FaRocket,
  FaMicrophone,
  FaSearch,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Error boundary to catch rendering errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error("JobsPage Error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-orange-100 p-6">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full">
            <div className="flex items-center mb-4 text-red-500">
              <FaExclamationTriangle size={24} className="mr-3" />
              <h2 className="text-2xl font-bold">Something went wrong</h2>
            </div>
            <p className="text-gray-700 mb-4">
              The jobs page encountered an error and couldn't render correctly.
            </p>
            <div className="bg-gray-100 p-4 rounded-md mb-4 overflow-auto max-h-[200px]">
              <pre className="text-xs whitespace-pre-wrap">
                {this.state.error?.toString()}
              </pre>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Log that the Jobs component file is being loaded
console.log("Jobs component file is being loaded");

// Main Jobs component (no longer exported directly)
function Jobs() {
  console.log("Jobs component function is being executed");

  // Add error state to track rendering errors
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [processingMessage, setProcessingMessage] = useState("");
  // Initialize with an empty array instead of undefined
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sample job data - in a real application, this would come from an API/database
  const jobsData = [
    // Carpenters
    {
      id: 1,
      title: "Carpenter",
      type: "carpenter",
      jobType: "Contract/Part Time",
      location: "New York, NY",
      salary: "$25 - $35",
      description:
        "Experienced carpenter needed for home renovation projects. Must have 3+ years of experience and own tools.",
      postedDays: 2,
      companyLogo: "https://placehold.co/50x50",
    },
    {
      id: 2,
      title: "Senior Carpenter",
      type: "carpenter",
      jobType: "Full Time",
      location: "Boston, MA",
      salary: "$30 - $45",
      description:
        "Construction company looking for a senior carpenter with 5+ years of experience for commercial projects.",
      postedDays: 1,
      companyLogo: "https://placehold.co/50x50",
    },
    {
      id: 3,
      title: "Furniture Carpenter",
      type: "carpenter",
      jobType: "Contract",
      location: "Chicago, IL",
      salary: "$28 - $40",
      description:
        "Custom furniture shop seeking skilled carpenter with fine woodworking experience.",
      postedDays: 3,
      companyLogo: "https://placehold.co/50x50",
    },
    {
      id: 4,
      title: "Apprentice Carpenter",
      type: "carpenter",
      jobType: "Full Time",
      location: "Austin, TX",
      salary: "$18 - $25",
      description:
        "Looking for an apprentice carpenter to join our growing team. Training provided.",
      postedDays: 5,
      companyLogo: "https://placehold.co/50x50",
    },
    {
      id: 5,
      title: "Finish Carpenter",
      type: "carpenter",
      jobType: "Contract/Part Time",
      location: "Seattle, WA",
      salary: "$30 - $40",
      description:
        "Specialized finish carpenter needed for high-end residential projects. Attention to detail a must.",
      postedDays: 2,
      companyLogo: "https://placehold.co/50x50",
    },
    {
      id: 6,
      title: "Cabinet Maker",
      type: "carpenter",
      jobType: "Full Time",
      location: "Portland, OR",
      salary: "$28 - $38",
      description:
        "Custom cabinet shop seeking experienced carpenter with cabinet making skills.",
      postedDays: 6,
      companyLogo: "https://placehold.co/50x50",
    },

    // Electricians
    {
      id: 7,
      title: "Residential Electrician",
      type: "electrician",
      jobType: "Full Time",
      location: "Denver, CO",
      salary: "$30 - $45",
      description:
        "Licensed electrician needed for residential projects. Experience with modern electrical systems required.",
      postedDays: 3,
      companyLogo: "https://placehold.co/50x50",
    },
    {
      id: 8,
      title: "Commercial Electrician",
      type: "electrician",
      jobType: "Contract",
      location: "Phoenix, AZ",
      salary: "$35 - $50",
      description:
        "Large commercial electrical contractor seeking licensed electricians for ongoing projects.",
      postedDays: 1,
      companyLogo: "https://placehold.co/50x50",
    },
    {
      id: 9,
      title: "Industrial Electrician",
      type: "electrician",
      jobType: "Full Time",
      location: "Detroit, MI",
      salary: "$40 - $55",
      description:
        "Manufacturing facility seeking industrial electrician with experience in factory equipment and controls.",
      postedDays: 4,
      companyLogo: "https://placehold.co/50x50",
    },
    {
      id: 10,
      title: "Apprentice Electrician",
      type: "electrician",
      jobType: "Full Time",
      location: "Atlanta, GA",
      salary: "$20 - $30",
      description:
        "Electrical contractor looking for apprentice electricians to train. Some experience preferred.",
      postedDays: 2,
      companyLogo: "https://placehold.co/50x50",
    },
    {
      id: 11,
      title: "Maintenance Electrician",
      type: "electrician",
      jobType: "Part Time",
      location: "Miami, FL",
      salary: "$28 - $38",
      description:
        "Property management company seeking part-time maintenance electrician for multiple properties.",
      postedDays: 7,
      companyLogo: "https://placehold.co/50x50",
    },
    {
      id: 12,
      title: "Solar Panel Electrician",
      type: "electrician",
      jobType: "Contract/Full Time",
      location: "San Diego, CA",
      salary: "$35 - $50",
      description:
        "Solar installation company looking for licensed electricians with solar experience.",
      postedDays: 3,
      companyLogo: "https://placehold.co/50x50",
    },
  ];

  // Audio visualization
  const visualizerRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Helper function to check browser compatibility for speech recognition
  const isSpeechRecognitionSupported = () => {
    return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
  };

  // Initialize filtered jobs with all jobs
  useEffect(() => {
    try {
      console.log("Initializing jobs...");
      // Update all jobs at component mount (safe because jobsData is defined in component scope)
      setFilteredJobs(jobsData);

      // Log for debugging
      console.log("Initial jobs loaded:", jobsData.length);

      // Set loaded state to true
      setIsLoaded(true);
    } catch (err) {
      console.error("Error initializing jobs:", err);
      setError(
        "Failed to initialize jobs data: " + (err.message || "Unknown error")
      );
    }
  }, []); // Empty dependency array - only run once on mount

  // Create a constant reference to the fixed job data directly
  const fixedJobsData = jobsData; // The data already has the correct placeholder URLs

  // Check browser compatibility and handle component cleanup
  useEffect(() => {
    // Check browser compatibility on mount
    if (!isSpeechRecognitionSupported()) {
      console.warn("Speech Recognition is not supported in this browser");
      // Consider showing a message to the user
    } else {
      console.log("Speech Recognition is supported in this browser");
    }

    return () => {
      // Cleanup on unmount
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Clean up recognition instance
      if (recognition) {
        try {
          if (isListening) {
            recognition.stop();
          }
          // Clear event handlers
          recognition.onend = null;
          recognition.onresult = null;
          recognition.onerror = null;
          recognition.onstart = null;
        } catch (error) {
          console.log("Error cleaning up recognition:", error);
        }
      }

      // Clear any existing timeout when component unmounts
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout, recognition, isListening]);

  // Setup audio visualization when overlay is shown
  useEffect(() => {
    if (isOverlayVisible && visualizerRef.current) {
      setupAudioVisualization();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOverlayVisible]);

  // Filter jobs based on search term
  useEffect(() => {
    console.log("Filtering with search term:", searchTerm); // Debug log

    if (!searchTerm) {
      // If no search term, show all jobs
      setFilteredJobs(jobsData);
      return;
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    // Filter the jobs based on the search term
    const filtered = jobsData.filter((job) => {
      // Check if search term matches job title, type, or description
      return (
        job.title.toLowerCase().includes(normalizedSearchTerm) ||
        job.type.toLowerCase().includes(normalizedSearchTerm) ||
        job.description.toLowerCase().includes(normalizedSearchTerm) ||
        job.location.toLowerCase().includes(normalizedSearchTerm)
      );
    });

    console.log(
      `Found ${filtered.length} jobs matching "${normalizedSearchTerm}"`
    ); // Debug log
    setFilteredJobs(filtered);
  }, [searchTerm]);

  // Setup audio visualization
  const setupAudioVisualization = () => {
    if (!visualizerRef.current) return;

    const canvas = visualizerRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const drawVisualizer = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw animated sound waves based on whether we're listening or not
      if (isListening) {
        const centerY = canvas.height / 2;
        const waveCount = 6;
        const waveWidth = canvas.width / waveCount;
        const time = Date.now() / 1000;

        ctx.lineWidth = 4;
        ctx.lineCap = "round";

        for (let i = 0; i < waveCount; i++) {
          const x = i * waveWidth + waveWidth / 2;
          // Create a sine wave effect with varying amplitude
          const amplitude = isListening ? 20 + Math.sin(time * 2 + i) * 15 : 5;

          ctx.beginPath();
          ctx.moveTo(x, centerY - amplitude);
          ctx.lineTo(x, centerY + amplitude);

          // Gradient from purple to orange
          const gradient = ctx.createLinearGradient(
            0,
            centerY - amplitude,
            0,
            centerY + amplitude
          );
          gradient.addColorStop(0, "#9333ea"); // Purple
          gradient.addColorStop(1, "#f97316"); // Orange
          ctx.strokeStyle = gradient;

          ctx.stroke();
        }
      } else {
        // Draw a flat line when not listening
        const centerY = canvas.height / 2;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.strokeStyle = "#9333ea";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(drawVisualizer);
    };

    drawVisualizer();
  };

  // Create a fresh recognition instance with better error handling
  const createRecognitionInstance = () => {
    try {
      if (!isSpeechRecognitionSupported()) {
        console.warn("Speech Recognition is not supported in this browser");
        return null;
      }

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      console.log("Created new SpeechRecognition instance");

      // Configure recognition settings
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      // Use a local variable for the isRecognitionActive state to avoid race conditions
      let isActive = false;

      // Set up event handlers
      recognitionInstance.onstart = () => {
        console.log("Recognition started");
        setTranscript("");
        setInterimTranscript("");
        isActive = true;
      };

      recognitionInstance.onresult = (event) => {
        console.log("Got speech recognition result", event);
        if (!isActive) return; // Skip processing if recognition is no longer active

        let finalTranscript = "";
        let interimResult = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimResult += result[0].transcript;
          }
        }

        if (finalTranscript) {
          // Update the full transcript
          setTranscript((prevTranscript) => {
            const newTranscript = prevTranscript
              ? prevTranscript + " " + finalTranscript.trim()
              : finalTranscript.trim();
            return newTranscript;
          });

          // Extract job title and setup timeout
          extractAndProcessSpeech(finalTranscript);
        }

        setInterimTranscript(interimResult);
      };

      recognitionInstance.onerror = (event) => {
        // For aborted errors, this is often expected behavior (like when we call stop())
        if (event.error === "aborted") {
          console.log("Recognition was aborted, likely due to manual stop");
        } else {
          // For other errors, log them but don't alert the user for every instance
          console.error("Speech recognition error:", event.error);
        }

        isActive = false;
        setIsListening(false);

        // Only close overlay for non-aborted errors when not processing
        if (event.error !== "aborted" || !processingMessage) {
          // Add slight delay to avoid UI flashing
          setTimeout(() => {
            if (!processingMessage) {
              setIsOverlayVisible(false);
            }
          }, 100);
        }
      };

      recognitionInstance.onend = () => {
        console.log("Recognition ended");
        isActive = false;
        setIsListening(false);

        // If there was no processing message and no transcript, close the overlay
        // This helps with cases where recognition ends without any useful results
        setTimeout(() => {
          if (!processingMessage && !transcript) {
            console.log("No speech detected - closing overlay");
            setIsOverlayVisible(false);
          }
          // Otherwise we keep the overlay open to allow processing message to show
        }, 500);
      };

      return recognitionInstance;
    } catch (error) {
      console.error("Error creating speech recognition:", error);
      setError(
        "Failed to initialize speech recognition. Please try again or use text search."
      );
      return null;
    }

    return recognitionInstance;
  };

  // Extract and process speech with timeout
  const extractAndProcessSpeech = (finalTranscript) => {
    // Extract job titles from the transcript
    const extractJobTitle = (text) => {
      // Common job titles we want to extract - same function as before
      const jobTitles = [
        "carpenter",
        "electrician",
        "plumber",
        "painter",
        "mechanic",
        "driver",
        "cleaner",
        "gardener",
        "technician",
        "engineer",
        "developer",
        "designer",
        "teacher",
        "doctor",
        "nurse",
        "cook",
        "chef",
      ];

      // Common phrases that precede job titles
      const searchPhrases = [
        "looking for",
        "need a",
        "find a",
        "want a",
        "searching for",
        "hire a",
        "seeking",
        "find me",
        "i want a",
        "i need a",
        "i am looking for",
        "show me",
        "i am searching for",
      ];

      // Convert text to lowercase for easier matching
      const lowercaseText = text.toLowerCase();

      // First try to find if any job titles exist directly in the text
      const foundTitle = jobTitles.find((title) =>
        lowercaseText.includes(title)
      );

      if (foundTitle) {
        return foundTitle;
      }

      // If no direct job title, try to extract based on search phrases
      for (const phrase of searchPhrases) {
        if (lowercaseText.includes(phrase)) {
          // Get the text after the phrase
          const afterPhrase = lowercaseText.split(phrase)[1];
          if (afterPhrase) {
            // Extract the next word(s) as potential job title
            const words = afterPhrase.trim().split(" ");
            if (words.length > 0) {
              return words[0]; // Return the first word after the phrase
            }
          }
        }
      }

      // If no pattern matched, return the original text
      return text.trim();
    };

    // Clear any existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a timeout to process the search after voice input completes
    const timeout = setTimeout(() => {
      // Extract the job title from the complete transcript
      const completeTranscript = transcript + " " + finalTranscript.trim();
      const extractedJobTitle = extractJobTitle(completeTranscript);

      setProcessingMessage(`Searching for "${extractedJobTitle}"...`);

      // Set the search term to the extracted job title which will trigger the filtering useEffect
      setSearchTerm(extractedJobTitle);

      // Directly filter the jobs based on extracted title to ensure immediate update
      const normalizedSearchTerm = extractedJobTitle.toLowerCase().trim();
      const filtered = jobsData.filter((job) => {
        return (
          job.title.toLowerCase().includes(normalizedSearchTerm) ||
          job.type.toLowerCase().includes(normalizedSearchTerm) ||
          job.description.toLowerCase().includes(normalizedSearchTerm) ||
          job.location.toLowerCase().includes(normalizedSearchTerm)
        );
      });

      // Update filtered jobs directly in addition to relying on the useEffect
      setFilteredJobs(filtered);

      // Wait a moment to show the processing message, then close the overlay
      setTimeout(() => {
        setProcessingMessage("");
        setIsOverlayVisible(false);
        setIsListening(false);

        // Clean up the recognition instance
        if (recognition) {
          try {
            recognition.stop();
            setRecognition(null); // Fully clean up the recognition instance
          } catch (error) {
            console.log("Error cleaning up recognition:", error);
          }
        }

        // Force an additional re-render to ensure filtered jobs are displayed
        console.log(
          `Search complete: Found ${filtered.length} results for "${extractedJobTitle}"`
        );

        // Explicitly re-set filtered jobs once more to ensure UI update
        setFilteredJobs((prev) => {
          if (
            prev.length === filtered.length &&
            prev.every((job, i) => job.id === filtered[i].id)
          ) {
            // If they're the same, force a re-render by creating a new array
            return [...filtered];
          }
          return filtered;
        });
      }, 1500);
    }, 2000); // Wait 2 seconds after speech ends to process

    setSearchTimeout(timeout);
  };

  // Toggle listening state
  const handleVoiceSearch = () => {
    console.log("Voice search button clicked. Current state:", {
      isListening,
      isOverlayVisible,
    });

    // Clear any existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
      setSearchTimeout(null);
    }

    if (isListening) {
      console.log("Stopping voice recognition");
      // If currently listening, stop recognition
      if (recognition) {
        try {
          recognition.stop();
        } catch (error) {
          console.log("Error stopping recognition:", error);
        }
      }
      setIsListening(false);
      setIsOverlayVisible(false);
      setProcessingMessage("");
    } else {
      console.log("Starting voice recognition");
      // Reset transcript when starting a new search
      setTranscript("");
      setInterimTranscript("");
      setProcessingMessage("");

      // Show overlay first
      setIsOverlayVisible(true);

      // Fully stop and clean up any existing recognition instance
      if (recognition) {
        try {
          recognition.abort(); // More forceful than stop()
          recognition.onend = null; // Remove event handlers
          recognition.onresult = null;
          recognition.onerror = null;
          recognition.onstart = null;
          // Wait for complete cleanup before creating a new instance
          setRecognition(null);
        } catch (error) {
          console.log("Error stopping existing recognition:", error);
        }
      }

      // Create fresh recognition instance with a small delay to ensure cleanup is complete
      console.log("Creating new speech recognition instance");
      setTimeout(() => {
        const newRecognition = createRecognitionInstance();
        if (!newRecognition) {
          console.error("Failed to create speech recognition instance");
          alert(
            "Sorry, your browser doesn't support speech recognition or there was an error creating it"
          );
          setIsOverlayVisible(false);
          return;
        }

        // Set the new recognition instance
        setRecognition(newRecognition);

        // Start recognition after ensuring the recognition instance is set
        try {
          console.log("Starting speech recognition");
          newRecognition.start();
          setIsListening(true);
          console.log("Voice search started successfully");

          // Set a maximum timeout for the overlay to be visible (safety mechanism)
          const safetyTimeout = setTimeout(() => {
            if (isOverlayVisible && isListening) {
              console.log(
                "Safety timeout triggered - closing voice search overlay"
              );
              setIsListening(false);
              setIsOverlayVisible(false);
              try {
                newRecognition.stop();
              } catch (e) {
                console.log("Error stopping recognition in safety timeout", e);
              }
            }
          }, 20000); // 20 seconds maximum time for voice search

          // Store the safety timeout ID so it can be cleared if needed
          return () => clearTimeout(safetyTimeout);
        } catch (error) {
          console.error("Error starting recognition:", error);
          // If there's an error, make sure we reset the UI state
          setIsListening(false);
          setIsOverlayVisible(false);
          alert(
            "There was an error starting voice recognition. Please try again."
          );
        }
      }, 500); // Increased delay to ensure cleanup is complete
    }
  };

  // Close overlay and stop listening
  const handleCloseOverlay = () => {
    // Clear any existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
      setSearchTimeout(null);
    }

    // Stop recognition if it exists
    if (recognition) {
      try {
        recognition.stop();
      } catch (error) {
        console.log("Error stopping recognition:", error);
      }

      // Reset recognition instance
      setRecognition(null);
    }

    // Reset all UI states
    setIsListening(false);
    setIsOverlayVisible(false);
    setProcessingMessage("");
    console.log("Voice search overlay closed, recognition stopped");
  };

  // Error handling for development
  useEffect(() => {
    const handleError = (event) => {
      console.error("Error caught by error handler:", event.error);
      setError(event.error?.message || "An unknown error occurred");
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  // If there's an error, show error message
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-orange-100 font-[Inter] p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-700 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Reload Page
        </button>
      </div>
    );
  }

  // If still loading, show loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-orange-100 font-[Inter]">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700">Loading jobs...</p>
        <p className="mt-2 text-sm text-gray-500">
          {filteredJobs?.length > 0
            ? `Found ${filteredJobs.length} jobs, preparing display...`
            : "Initializing job listings..."}
        </p>
      </div>
    );
  }

  // Main component rendering
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-50 to-orange-100 font-[Inter]">
      {/* Voice Search Overlay */}
      <AnimatePresence>
        {isOverlayVisible && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <button
                onClick={handleCloseOverlay}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
                aria-label="Close voice search"
              >
                <FaTimes size={20} />
              </button>

              <motion.h3
                className="text-xl font-bold text-center mb-4"
                key={processingMessage || (isListening ? "listening" : "idle")}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {processingMessage
                  ? processingMessage
                  : isListening
                  ? "Listening..."
                  : "Voice Search"}
              </motion.h3>

              {/* Audio Visualizer */}
              <div className="h-24 bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <canvas ref={visualizerRef} className="w-full h-full" />
              </div>

              {/* Transcription Area */}
              <div className="min-h-[80px] max-h-[150px] overflow-y-auto mb-4 p-3 bg-gray-50 rounded-lg">
                {transcript && (
                  <p className="text-gray-800 font-medium">
                    {transcript}
                    <motion.span
                      className="text-purple-600"
                      key={interimTranscript}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {interimTranscript ? ` ${interimTranscript}` : ""}
                    </motion.span>
                  </p>
                )}
                {!transcript && !interimTranscript && (
                  <p className="text-gray-400 text-center italic">
                    {isListening
                      ? "Speak now..."
                      : "Click the microphone to start speaking"}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <motion.button
                  onClick={handleVoiceSearch}
                  disabled={!!processingMessage}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg 
                  ${
                    processingMessage
                      ? "bg-yellow-500"
                      : isListening
                      ? "bg-red-500"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600"
                  }`}
                  whileTap={{ scale: 0.9 }}
                  animate={
                    isListening && !processingMessage
                      ? {
                          scale: [1, 1.1, 1],
                          transition: { repeat: Infinity, duration: 1.5 },
                        }
                      : processingMessage
                      ? {
                          rotate: [0, 360],
                          transition: {
                            repeat: Infinity,
                            duration: 2,
                            ease: "linear",
                          },
                        }
                      : {}
                  }
                >
                  {processingMessage ? (
                    <motion.div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full" />
                  ) : (
                    <FaMicrophone className="text-white text-2xl" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-xl p-6 space-y-6 rounded-r-xl">
        <h2 className="text-2xl font-extrabold text-purple-700 mb-6">
          📍 Kaamigo
        </h2>
        <nav className="space-y-3">
          {[
            { label: "Explore", path: "/explore", icon: <LuLayoutDashboard /> },
            { label: "Reels", path: "/explore/reels", icon: <FaVideo /> },
            { label: "Jobs", path: "/explore/jobs", icon: <FaBriefcase /> },
            { label: "Profile", path: "/explore/profile", icon: <FaUserAlt /> },
            {
              label: "Features",
              path: "/explore/features",
              icon: <FaRocket />,
            },
            {
              label: "How it Works",
              path: "/explore/how-it-works",
              icon: <FaQuestion />,
            },
            {
              label: "Premium",
              path: "/explore/featurebtn",
              icon: <FaCrown />,
            },
          ].map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-purple-100 hover:text-purple-800"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-10">
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2 w-full lg:justify-between ">
            <div>
              <h2 className="text-3xl font-bold text-orange-500">Jobs Board</h2>
              {searchTerm && (
                <motion.p
                  className="text-sm text-gray-600 mt-1"
                  key={`${searchTerm}-${filteredJobs.length}`} // Re-animate when search term or results count changes
                  initial={{
                    opacity: 0,
                    y: -10,
                    fontWeight: "bold",
                    color: "#6d28d9",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    fontWeight: "normal",
                    color: "#4B5563",
                  }}
                  transition={{ duration: 0.8 }}
                >
                  Showing {filteredJobs.length} results for "{searchTerm}"
                </motion.p>
              )}
            </div>
            <div className="flex gap-2">
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500">
                Browse Jobs
              </button>
              <button className="bg-white text-orange-600 px-4 py-2 border border-orange-500 rounded-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-white">
                Post a Gig
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative w-full lg:w-1/3">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search by title or keyword..."
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    // Directly update filtered jobs on each keystroke
                    if (!value) {
                      setFilteredJobs(jobsData);
                    } else {
                      const normalizedValue = value.toLowerCase().trim();
                      const filtered = jobsData.filter((job) => {
                        return (
                          job.title.toLowerCase().includes(normalizedValue) ||
                          job.type.toLowerCase().includes(normalizedValue) ||
                          job.description
                            .toLowerCase()
                            .includes(normalizedValue) ||
                          job.location.toLowerCase().includes(normalizedValue)
                        );
                      });
                      setFilteredJobs(filtered);
                    }
                  }}
                  className="px-4 py-3 border rounded-full w-full pr-24 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                />
                <div className="absolute right-0 top-0 h-full flex">
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setFilteredJobs(jobsData);
                      }}
                      className="h-full px-3 text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                    >
                      <FaTimes />
                    </button>
                  )}
                  <motion.button
                    onClick={handleVoiceSearch}
                    className={`h-full px-3 flex items-center justify-center transition-all
                      ${
                        isListening
                          ? "text-red-500"
                          : "text-purple-600 hover:text-purple-800"
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Search with voice"
                    aria-label="Search with voice"
                  >
                    <FaMicrophone
                      className={`${
                        isListening ? "animate-pulse" : ""
                      } text-lg md:text-xl`}
                    />
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      // Execute search explicitly when clicked
                      console.log(`Searching for: ${searchTerm}`);
                      const normalizedSearchTerm = searchTerm
                        .toLowerCase()
                        .trim();

                      if (!normalizedSearchTerm) {
                        setFilteredJobs(jobsData);
                      } else {
                        const filtered = jobsData.filter((job) => {
                          return (
                            job.title
                              .toLowerCase()
                              .includes(normalizedSearchTerm) ||
                            job.type
                              .toLowerCase()
                              .includes(normalizedSearchTerm) ||
                            job.description
                              .toLowerCase()
                              .includes(normalizedSearchTerm) ||
                            job.location
                              .toLowerCase()
                              .includes(normalizedSearchTerm)
                          );
                        });
                        setFilteredJobs(filtered);
                      }
                    }}
                    className="h-full px-3 flex items-center justify-center text-purple-600 hover:text-purple-800 rounded-r-full transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Search"
                    aria-label="Search"
                  >
                    <FaSearch className="text-lg md:text-xl" />
                  </motion.button>
                </div>
              </div>

              {/* Voice status indicator (mini) */}
              {isListening && !isOverlayVisible && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 shadow-md z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Listening...
                </motion.div>
              )}
            </div>
            <div className="flex flex-wrap border-y p-3 gap-2 w-full lg:w-2/3">
              <select className="flex-1 min-w-[120px] px-4 py-2 border rounded-lg">
                <option>Category</option>
              </select>
              <select className="flex-1 min-w-[120px] px-4 py-2 border rounded-lg">
                <option>Budget</option>
              </select>
              <select className="flex-1 min-w-[120px] px-4 py-2 border rounded-lg">
                <option>Location</option>
              </select>
              <select className="flex-1 min-w-[120px] px-4 py-2 bg-gray-50 border rounded-lg">
                <option>Job Type</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="bg-white p-7 shadow-lg rounded-lg space-y-2 flex flex-col justify-between"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <img
                      src={job.companyLogo}
                      alt="Company Logo"
                      className="w-12 h-12 rounded-full"
                    />
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-purple-600 font-bold">{job.salary}</p>
                  </div>
                  <p className="text-sm text-orange-500">{job.jobType}</p>
                  <p className="text-sm text-orange-500">
                    Location: {job.location}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    {job.description}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-sm text-gray-400">
                    Posted {job.postedDays} days ago
                  </p>
                  <button className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600">
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl text-gray-500 mb-2">
                  No jobs found matching "{searchTerm}"
                </p>
                <p className="text-gray-400">
                  Try another search term or clear your search
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilteredJobs(jobsData);
                  }}
                  className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Clear Search
                </button>
              </motion.div>
            </div>
          )}
        </div>

        <div className="mt-12 bg-gradient-to-r from-indigo-100 via-purple-100 to-violet-200 p-6 rounded-lg text-center shadow">
          <h3 className="font-bold text-lg mb-2">Kaamigo</h3>
          <p className="text-sm text-gray-600 mb-4">Stay up to date</p>
          <div className="flex justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 border rounded-l-lg"
            />
            <button className="bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500">
              Subscribe
            </button>
          </div>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 right-4 bg-orange-600 text-white px-3 py-2 rounded-full shadow hover:bg-gradient-to-r from-orange-400 to-yellow-500 transition duration-300"
        >
          Go Back
        </button>
      </main>
    </div>
  );
}

// Wrap Jobs component with ErrorBoundary and export
export default function SafeJobs() {
  return (
    <ErrorBoundary>
      <Jobs />
    </ErrorBoundary>
  );
}