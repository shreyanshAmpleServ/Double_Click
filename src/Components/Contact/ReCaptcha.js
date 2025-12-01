// src/Components/Contact/ReCaptcha.js
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
import { captchaVarifyFn } from "Services/Home"

const ReCaptchaCheckbox = forwardRef(
  (
    {
      siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY,
      setCaptchaStatus = () => {},
      theme = "light",
      size = "normal",
    },
    ref
  ) => {
    const widgetRef = useRef(null)

    // token from recaptcha (temporary), and verifiedToken after server confirms
    const [token, setToken] = useState(null)
    const [verifiedToken, setVerifiedToken] = useState(null)
    const [status, setStatus] = useState("idle") // idle | verifying | success | failed

    // Use mutation to explicitly verify token
    const verifyMutation = useMutation((t) => captchaVarifyFn({ token: t }), {
      onMutate: () => {
        setStatus("verifying")
      },
      onSuccess: (response) => {
        // adapt depending on your API shape
        const result = response?.data ?? response
        const isVerified = !!result?.is_verified

        if (isVerified) {
          setVerifiedToken(token) // store the token that was verified
          setToken(null) // clears temporal token
          setStatus("success")
          setCaptchaStatus(true)
          toast.success("Captcha verified")
        } else {
          setVerifiedToken(null)
          setStatus("failed")
          setCaptchaStatus(false)
          toast.error("Captcha verification failed")
          widgetRef.current?.reset()
          setToken(null)
        }
      },
      onError: (err) => {
        console.error("Captcha verification error:", err)
        setVerifiedToken(null)
        setStatus("failed")
        setCaptchaStatus(false)
        toast.error("Captcha verification error")
        widgetRef.current?.reset()
        setToken(null)
      },
    })

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      // return verified token only when status is success
      getValue: () => (status === "success" ? verifiedToken : null),
      reset: () => {
        try {
          widgetRef.current?.reset()
        } catch (err) {
          console.error("Failed to reset reCAPTCHA:", err)
        }
        setToken(null)
        setVerifiedToken(null)
        setStatus("idle")
        setCaptchaStatus(false)
      },
    }))

    // When checkbox is clicked, recaptcha returns a token string `t`
    const handleChange = (t) => {
      if (!t) {
        // user unchecked or token expired
        setToken(null)
        setStatus("idle")
        setVerifiedToken(null)
        setCaptchaStatus(false)
        return
      }

      // set token and explicitly trigger verification
      setToken(t)
      setStatus("verifying")
      verifyMutation.mutate(t)
    }

    return (
      <div className="relative inline-block">
        {/* wrapper so we can show overlay when verifying */}
        <div className="relative">
          <ReCAPTCHA
            ref={widgetRef}
            sitekey={"6LfNPgwsAAAAAOwYd8f-Yu1hgsuK4gEcQZsdEa5Q"}
            onChange={handleChange}
            onErrored={() => {
              setStatus("failed")
              toast.error("Failed to load reCAPTCHA")
            }}
            theme={theme}
            size={size}
            style={{ display: "inline-block" }}
          />

          {/* overlay while verifying: blocks interaction and shows spinner */}

          {status === "verifying" && (
            <div
              className="w-10"
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 3,
                background: "#f8fafc",
                borderRadius: 4,
                margin: 8,
                // width: "10",
                height: "60%",
                zIndex: 10,
              }}
            >
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-8 w-8 text-blue-700" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
                  <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
                {/* <span className="text-sm font-medium">Verifying...</span> */}
              </div>
            </div>
          )}
        </div>

        {/* UI feedback below widget */}
        <div className="mt-1 text-sm font-medium">
          {status === "idle" && <span className="text-gray-600">Please check captcha</span>}

          {status === "verifying" && <span className="text-blue-600">Verifying...</span>}

          {status === "success" && <span className="text-green-600">Captcha Verified ✓</span>}

          {status === "failed" && <span className="text-red-600">Verification Failed ✗</span>}
        </div>
      </div>
    )
  }
)

ReCaptchaCheckbox.displayName = "ReCaptchaCheckbox"
export default ReCaptchaCheckbox
