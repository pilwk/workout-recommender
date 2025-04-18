import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

//Entry for FullView

const FullView = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const steps = ["/fullview/welcome", "/fullview/duration", "/fullview/intensity", "/fullview/musclegroup", "/fullview/result"]
    const currentIndex = steps.indexOf(location.pathname)
    const isFirstStep = currentIndex === 0

    const goBackToStart = () => {
        navigate("/fullview")
    }

    const onPrev = () => {
        if (currentIndex > 0) {
            navigate(steps[currentIndex - 1])
        }
    }

    return (
        <div style={{...styles.container, ...(isFirstStep ? styles.clickable : {})}} onClick={isFirstStep ? () => navigate(steps[currentIndex + 1]) : undefined}>
            <Header />
            <div style={styles.content}>
                <Outlet /> {/* This will render DurationScreen, IntensityScreen, etc. */}
            </div>
            <Footer
                onNext={() => navigate(steps[currentIndex + 1])}
                onPrev={onPrev}
                onSubmit={() => alert("printing results...")} // replace with actual print logic...
                isFirstStep={isFirstStep}
                isLastStep={currentIndex === steps.length - 1}
                onBackToStart={goBackToStart}
            />
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    content: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflow: "hidden"
    },
}

export default FullView