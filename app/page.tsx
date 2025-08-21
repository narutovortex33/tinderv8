"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Wifi,
  Camera,
  User,
  Heart,
  MapPin,
  MessageCircle,
  Shield,
  AlertTriangle,
  Lock,
  Activity,
  Eye,
  CheckCircle,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useGeolocation } from "@/hooks/useGeolocation"

type AppStep = "landing" | "form" | "verification" | "preliminary" | "generating" | "result" | "offer"

// Updated sales proof messages without specific cities/states
const SalesProofPopup = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState("")

  const salesMessages = [
    "✅ Jessica from Austin unlocked a report 12 minutes ago",
    "✅ Sarah recently viewed conversation history",
    "✅ Michelle just accessed confidential photos",
    "✅ Jennifer completed a full analysis right now",
    "✅ Ashley gained access to the confidential report moments ago",
    "✅ Rachel performed a complete verification right now",
  ]

  useEffect(() => {
    if (show) {
      const randomMessage = salesMessages[Math.floor(Math.random() * salesMessages.length)]
      setCurrentMessage(randomMessage)
    }
  }, [show])

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: -20 }}
      className="fixed bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-xs z-50 bg-white border border-gray-200 rounded-xl shadow-2xl p-3 sm:p-4"
      style={{
        fontSize: "13px",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-800 leading-tight">{currentMessage}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 flex-shrink-0"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </motion.div>
  )
}

const malePhotos1824 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maxnastyi.jpg-y7f834gE9VgfTOXDVU1VietC03F4tB.jpeg", // maxnastyi.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eeerik.jpg-iWXlod890Mbng3f0W0iNApzzqNCE6d.jpeg", // eeerik.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/joanraay.jpg-yAL0eUMZBdU3hdvCDSYrYtymFcWXc6.jpeg", // joanraay.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/armeyes.jpg-DzLVKj6aqPPOhLs6ODOHXQT0X2OQKk.jpeg", // armeyes.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dieego69.jpg-Gc1LtwSCGu7KDWMxTJM1sosoyTfTQV.jpeg", // dieego69.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/franrick.jpg-fY4ZAbqJAhrDCdDtH1ThJvfwjBuDiZ.jpeg", // franrick.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nahuelbaby.jpg-Wy4DXDg2M5tYcbYtH4hgnBBhzlTaTE.jpeg", // nahuelbaby.jpg
]

const malePhotos2534 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bushidoboy.jpg-SHM52WRaSbHRHS8mRtRQ6Fe2DSTCbO.jpeg", // bushidoboy.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/franchescox.jpg-JsgFqWArDB13u3u0BFntOqXEvbINbg.jpeg", // franchescox.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/andyreiddvip.jpg-ADqckUKPAvPiUTkqrNyrPjvC4F8cL6.jpeg", // andyreiddvip.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/matthewteddy.jpg-YUsMLMjSy32mMNEzNULz4IVjOjexZg.jpeg", // matthewteddy.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shyguyishere.jpg-dJb8kRoXYgn3P886uXmiqRbsondkSH.jpeg", // shyguyishere.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tomidiazj.jpg-cp9BHFGJjjkWte9gjLLoTdKON8rKjo.jpeg", // tomidiazj.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carterlander08.jpg-6TKolDAUlVN4IpoP1utEl80vpLBuZx.jpeg", // carterlander08.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nanoargentino.jpg-FfjNeo7H8M5JHOCz4S8Ruu9sJKeAqI.jpeg", // nanoargentino.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/latinblondarg.jpg-KeDld7pykzba0afA8Neq9MJ3KYTipZ.jpeg", // latinblondarg.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/augst_ts.jpg-IrXADrgpCKpV7qV4U61C98j0ANgptE.jpeg", // augst_ts.jpg
]

const malePhotos3544 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nicoink.jpg-VJt8sUsXTpqStcdd3k6nKJsyw0OC4l.jpeg", // nicoink.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/thebigitaliansub.jpg-y4GDz8EUCnbKZcCDmbrRaAuG9N7nhw.jpeg", // thebigitaliansub.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/josepbgfeet.jpg-Shui0D0kxprkJ59ousTMbsW6RPZ9LP.jpeg", // josepbgfeet.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/morocholatino87.jpg-Fy8NHtZVDkZSvzqDg7XBalE1XdDqhI.jpeg", // morocholatino87.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/thesuitedboss.jpg-mMqyAVQUJsgf9gyTa5F33NMqPkNaoT.jpeg", // thesuitedboss.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nicoalpalo22.jpg-2f10UhAb5GNH5oHa0XQDke5267iO4i.jpeg", // nicoalpalo22.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tunacho.jpg-NC3tCbUJog6cPs0WW1IlVZY3VQJ27s.jpeg", // tunacho.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ovalo-sex.jpg-C8pmDJCmKESfLhAGUdKSPW9KMAFLqP.jpeg", // ovalo-sex.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/puntogof.jpg-iJSKomEC0QRKYLmQsI2S5dn2FLcFwq.jpeg", // puntogof.jpg
]

const malePhotos4554 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hombrelatinoarg.jpg-vxsqKHnfvJ7zpW7ZlkqzVSxLPV5LJN.jpeg", // hombrelatinoarg.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/petemastersxxx.jpg-QPnKLV8AASm7mszaFw34zOKeL3eP0q.jpeg", // petemastersxxx.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coachtennisdad.jpg-Ew3oEYdM3y7JZh2vb7G2TAqDmHfIAR.jpeg", // coachtennisdad.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/scorcherb8.jpg-2JydRinBvxWCCdXblw3Q5fC9G4QYtF.jpeg", // scorcherb8.jpg
]

const femalePhotos1824 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/born2bscene.jpg-CrqOerhJrG3Fc7wmpr6fCeeWAM6BHA.jpeg", // born2bscene.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/izzybunniesvip.jpg-MA6cjWqoBX9kQZ3OtnnbMsfISt9Llv.jpeg", // izzybunniesvip.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imjuliequeen.jpg-HTth575rQz3GfsR0o3Tyt0uXt0rBYp.jpeg", // imjuliequeen.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/babygirlmiza.jpg-N1ba5KxtvC4gIpveBKlsCUAZh3GYZM.jpeg", // babygirlmiza.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/louprival.jpg-eqlHNgBCJoPoW919wIwknyWJ7IaYJH.jpeg", // louprival.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/liliafourtwenty.jpg-2Z0S077E9ol454xXLw8j3c5IUFyfvj.jpeg", // liliafourtwenty.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tulpina.jpg-oLPI7D7DwDmZrrtbf0tQFGL7i6xxqB.jpeg", // Tulpina.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ScarletBae.jpg-IeIjB3RhZSqAjC7hThhFUBWtPptiB0.jpeg", // ScarletBae.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PolyKittenMyr.jpg-irLfn7M144zkAy5x1ZfCJvQNa97Mg2.jpeg", // PolyKittenMyr.jpg
]

const femalePhotos2534 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ThorriandJax.jpg-NYO2GElQOPVB6RNydbj8y6FIgzqI5e.jpeg", // ThorriandJax.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/megnut.jpg-cqeal6tZxOUeFbGn3Xptpho7yPbv03.jpeg", // megnut.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/siswet.jpg-6ugpiNeMruVl7mJb9SK85lJqXyeYm0.jpeg", // siswet.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/toomanypeaches.jpg-ngtTtNT4WIYuTptk2Vex6Wyzg6egrF.jpeg", // toomanypeaches.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ruth_lee.jpg-w9X70NVEm8WdeSInTZiCt3nrKy40OJ.jpeg", // ruth_lee.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/graciebon1.jpg-4Inf3gP696ElJ3N8GbqxYzOWwFX8ws.jpeg", // graciebon1.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/juicyjade9.jpg-XpGGpkX6xOJu6P2Q09gdS5K6RydDh4.jpeg", // juicyjade9.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bustanutters.jpg-InxvODOtn2EMClREOAtWX8HUhg4XuH.jpeg", // bustanutters.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brujita.roja.jpg-7AHoFzgFSOq08Xkf1HbMlhHv6F2Ufp.jpeg", // brujita.roja.jpg
]

const femalePhotos3544 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/polarainbow.jpg-2m8cd4I5MqsjlCUUVnT4BNRAoVZ9vd.jpeg", // polarainbow.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/belle_oharaxxx.jpg-24o1RLGkpHbb3seXZeiENHMRu7exm8.jpeg", // belle_oharaxxx.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/txhotwife84_free.jpg-KX726VoNNEUPcU2UITX4LHx35QhfBr.jpeg", // txhotwife84_free.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/syrenjaymes.jpg-ZsjqvXFptcgMwWWYIobECFSCaxYlVw.jpeg", // syrenjaymes.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/goodtimetrouble.jpg-IbETNjsDkNbpAIz3M6fX22WqcNsDhe.jpeg", // goodtimetrouble.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brynnwoods.jpg-eeI8d0AUcbxGlxn7tHdYMatumN3kso.jpeg", // brynnwoods.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hannahbrooks25.jpg-I5t05KWFkTPODrTDmT9EbZ3g8y4Uxh.jpeg", // hannahbrooks25.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/qtsnack.jpg-zpcRq0tZCX9qMIwhXgZW1jxQ94sqxP.jpeg", // qtsnack.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anialisimo.jpg-oz9KqFWKrOze3YXO0LuowuuR1si4QQ.jpeg", // anialisimo.jpg
]

const femalePhotos4554 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jemmaluv.jpg-KyZTtI9Bpa9JNd2464knWdcOaJ0eEP.jpeg", // jemmaluv.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/usapippa.jpg-QQrmSyaX03Nvq2VsmwewP9BxwY9WZZ.jpeg", // usapippa.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rileysweetnsexy.jpg-fbsx4s7dXRzfVvlflDi2KkZBEvsp5U.jpeg", // rileysweetnsexy.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stellahere.jpg-MXSX9oUds7Z5Pq0jwB4xNkmkxY7Eko.jpeg", // stellahere.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AvrilShowers.jpg-QWZkGgYW9iz2JkwQZzY0aWDEv686cF.jpeg", // AvrilShowers.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quiet_winner_76.jpg-h6xFZ54Pd4uclbb5y4vpBjaxY11zJh.jpeg", // quiet_winner_76.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eroticnikki.jpg-IfE8CknUU6lUsxHxkPHvh1NplTvNAb.jpeg", // eroticnikki.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/goldieblair.jpg-V9ekH0vPvTIKuKMkcIgmCMFOY0FYlA.jpeg", // goldieblair.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/annikarose69.jpg-GI8Om7aRdzfvkyARy5w6d1O2niD5NK.jpeg", // annikarose69.jpg
]

const maleNames = {
  "18-24": ["Liam", "Noah", "Oliver", "Elijah", "James", "William", "Benjamin", "Lucas", "Henry", "Theodore"],
  "25-34": ["Alexander", "Ethan", "Michael", "Daniel", "Matthew", "Joseph", "Andrew", "Christopher", "Ryan", "David"],
  "35-44": ["Robert", "John", "Brian", "Kevin", "Jeffrey", "Thomas", "Steven", "Gary", "Timothy", "Eric"],
  "45-54": ["Mark", "Richard", "Kenneth", "Scott", "Anthony", "Gregory", "Stephen", "Patrick", "Sean", "Jason"],
}

const femaleNames = {
  "18-24": ["Olivia", "Emma", "Ava", "Sophia", "Isabella", "Mia", "Amelia", "Harper", "Evelyn", "Abigail"],
  "25-34": ["Emily", "Madison", "Elizabeth", "Chloe", "Ella", "Natalie", "Samantha", "Grace", "Sarah", "Jessica"],
  "35-44": ["Jennifer", "Michelle", "Lisa", "Amy", "Angela", "Stephanie", "Nicole", "Melissa", "Kimberly", "Heather"],
  "45-54": ["Mary", "Linda", "Barbara", "Susan", "Margaret", "Carol", "Sandra", "Nancy", "Sharon", "Donna"],
}

export default function SigiloX() {
  const [currentStep, setCurrentStep] = useState<AppStep>("landing")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedGender, setSelectedGender] = useState("")
  const [lastTinderUse, setLastTinderUse] = useState("")
  const [cityChange, setCityChange] = useState("")
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)
  const [photoError, setPhotoError] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [isPhotoPrivate, setIsPhotoPrivate] = useState(false)
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [verificationMessage, setVerificationMessage] = useState("Starting analysis...")
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [generatingMessage, setGeneratingMessage] = useState("Analyzing profile photos...")
  const [stepCompleted, setStepCompleted] = useState({
    profilePhotos: false,
    conversations: false,
    finalizing: false,
  })
  const [timeLeft, setTimeLeft] = useState(9 * 60 + 50) // 9:50
  const [showSalesPopup, setShowSalesPopup] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showSalesProof, setShowSalesProof] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)
  const [ageRange, setAgeRange] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [generatedProfiles, setGeneratedProfiles] = useState<any[]>([])
  const [selectedRandomPhoto, setSelectedRandomPhoto] = useState<string | null>(null)

  const [selectedCountry, setSelectedCountry] = useState({
    code: "+1",
    name: "United States",
    flag: "🇺🇸",
    placeholder: "(555) 123-4567",
  })
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")

  const countries = [
    { code: "+1", name: "United States", flag: "🇺🇸", placeholder: "(555) 123-4567" },
    { code: "+1", name: "Canada", flag: "🇨🇦", placeholder: "(555) 123-4567" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧", placeholder: "7911 123456" },
    { code: "+33", name: "France", flag: "🇫🇷", placeholder: "6 12 34 56 78" },
    { code: "+49", name: "Germany", flag: "🇩🇪", placeholder: "1512 3456789" },
    { code: "+39", name: "Italy", flag: "🇮🇹", placeholder: "312 345 6789" },
    { code: "+34", name: "Spain", flag: "🇪🇸", placeholder: "612 34 56 78" },
    { code: "+351", name: "Portugal", flag: "🇵🇹", placeholder: "912 345 678" },
    { code: "+52", name: "Mexico", flag: "🇲🇽", placeholder: "55 1234 5678" },
    { code: "+55", name: "Brazil", flag: "🇧🇷", placeholder: "(11) 99999-9999" },
    { code: "+54", name: "Argentina", flag: "🇦🇷", placeholder: "11 1234-5678" },
    { code: "+56", name: "Chile", flag: "🇨🇱", placeholder: "9 1234 5678" },
    { code: "+57", name: "Colombia", flag: "🇨🇴", placeholder: "300 1234567" },
    { code: "+51", name: "Peru", flag: "🇵🇪", placeholder: "912 345 678" },
    { code: "+58", name: "Venezuela", flag: "🇻🇪", placeholder: "412-1234567" },
    { code: "+593", name: "Ecuador", flag: "🇪🇨", placeholder: "99 123 4567" },
    { code: "+595", name: "Paraguay", flag: "🇵🇾", placeholder: "961 123456" },
    { code: "+598", name: "Uruguay", flag: "🇺🇾", placeholder: "94 123 456" },
    { code: "+591", name: "Bolivia", flag: "🇧🇴", placeholder: "71234567" },
    { code: "+81", name: "Japan", flag: "🇯🇵", placeholder: "90-1234-5678" },
    { code: "+82", name: "South Korea", flag: "🇰🇷", placeholder: "10-1234-5678" },
    { code: "+86", name: "China", flag: "🇨🇳", placeholder: "138 0013 8000" },
    { code: "+91", name: "India", flag: "🇮🇳", placeholder: "81234 56789" },
    { code: "+61", name: "Australia", flag: "🇦🇺", placeholder: "412 345 678" },
    { code: "+64", name: "New Zealand", flag: "🇳🇿", placeholder: "21 123 4567" },
    { code: "+27", name: "South Africa", flag: "🇿🇦", placeholder: "71 123 4567" },
    { code: "+20", name: "Egypt", flag: "🇪🇬", placeholder: "100 123 4567" },
    { code: "+234", name: "Nigeria", flag: "🇳🇬", placeholder: "802 123 4567" },
    { code: "+254", name: "Kenya", flag: "🇰🇪", placeholder: "712 123456" },
    { code: "+971", name: "United Arab Emirates", flag: "🇦🇪", placeholder: "50 123 4567" },
    { code: "+966", name: "Saudi Arabia", flag: "🇸🇦", placeholder: "50 123 4567" },
    { code: "+90", name: "Turkey", flag: "🇹🇷", placeholder: "501 234 56 78" },
    { code: "+7", name: "Russia", flag: "🇷🇺", placeholder: "912 345-67-89" },
    { code: "+380", name: "Ukraine", flag: "🇺🇦", placeholder: "50 123 4567" },
    { code: "+48", name: "Poland", flag: "🇵🇱", placeholder: "512 345 678" },
    { code: "+31", name: "Netherlands", flag: "🇳🇱", placeholder: "6 12345678" },
    { code: "+32", name: "Belgium", flag: "🇧🇪", placeholder: "470 12 34 56" },
    { code: "+41", name: "Switzerland", flag: "🇨🇭", placeholder: "78 123 45 67" },
    { code: "+43", name: "Austria", flag: "🇦🇹", placeholder: "664 123456" },
    { code: "+45", name: "Denmark", flag: "🇩🇰", placeholder: "20 12 34 56" },
    { code: "+46", name: "Sweden", flag: "🇸🇪", placeholder: "70-123 45 67" },
    { code: "+47", name: "Norway", flag: "🇳🇴", placeholder: "406 12 345" },
    { code: "+358", name: "Finland", flag: "🇫🇮", placeholder: "50 123 4567" },
    { code: "+65", name: "Singapore", flag: "🇸🇬", placeholder: "8123 4567" },
    { code: "+63", name: "Philippines", flag: "🇵🇭", placeholder: "912 345 6789" },
    { code: "+62", name: "Indonesia", flag: "🇮🇩", placeholder: "0812 3456 789" },
    { code: "+60", name: "Malaysia", flag: "🇲🇾", placeholder: "012-345 6789" },
    { code: "+66", name: "Thailand", flag: "🇹🇭", placeholder: "081 234 5678" },
    { code: "+84", name: "Vietnam", flag: "🇻🇳", placeholder: "091 234 56 78" },
    { code: "+92", name: "Pakistan", flag: "🇵🇰", placeholder: "0300 1234567" },
    { code: "+98", name: "Iran", flag: "🇮🇷", placeholder: "0912 345 6789" },
    { code: "+94", name: "Sri Lanka", flag: "🇱🇰", placeholder: "071 123 4567" },
    { code: "+880", name: "Bangladesh", flag: "🇧🇩", placeholder: "01712 345678" },
    { code: "+855", name: "Cambodia", flag: "🇰🇭", placeholder: "092 123 456" },
    { code: "+673", name: "Brunei", flag: "🇧🇳", placeholder: "872 1234" },
    { code: "+679", name: "Fiji", flag: "🇫🇯", placeholder: "920 1234" },
    { code: "+675", name: "Papua New Guinea", flag: "🇵🇬", placeholder: "723 45678" },
    { code: "+677", name: "Solomon Islands", flag: "🇸🇧", placeholder: "742 1234" },
    { code: "+678", name: "Vanuatu", flag: "🇻🇺", placeholder: "778 1234" },
    { code: "+691", name: "Micronesia", flag: "🇫🇲", placeholder: "920 1234" },
    { code: "+692", name: "Marshall Islands", flag: "🇲🇭", placeholder: "692 1234" },
    { code: "+680", name: "Palau", flag: "🇵🇼", placeholder: "620 1234" },
    { code: "+685", name: "Samoa", flag: "🇼🇸", placeholder: "722 1234" },
    { code: "+676", name: "Tonga", flag: "🇹🇴", placeholder: "771 1234" },
    { code: "+682", name: "Cook Islands", flag: "🇨🇰", placeholder: "722 1234" },
    { code: "+683", name: "Niue", flag: "🇳🇺", placeholder: "811 1234" },
    { code: "+672", name: "Norfolk Island", flag: "🇳🇫", placeholder: "512 1234" },
    { code: "+670", name: "Timor-Leste", flag: "🇹🇱", placeholder: "771 1234" },
    { code: "+688", name: "Tuvalu", flag: "🇹🇻", placeholder: "771 1234" },
    { code: "+690", name: "Tokelau", flag: "🇹🇰", placeholder: "811 1234" },
    { code: "+239", name: "Sao Tome and Principe", flag: "🇸🇹", placeholder: "981 1234" },
    { code: "+240", name: "Equatorial Guinea", flag: "🇬🇶", placeholder: "222 123 456" },
    { code: "+241", name: "Gabon", flag: "🇬🇦", placeholder: "06 12 34 56 78" },
    { code: "+242", name: "Republic of the Congo", flag: "🇨🇬", placeholder: "06 123 4567" },
    { code: "+243", name: "Democratic Republic of the Congo", flag: "🇨🇩", placeholder: "081 123 4567" },
    { code: "+244", name: "Angola", flag: "🇦🇴", placeholder: "923 123 456" },
    { code: "+245", name: "Guinea-Bissau", flag: "🇬🇼", placeholder: "955 123 456" },
    { code: "+246", name: "Diego Garcia", flag: "🇮🇴", placeholder: "380 1234" },
    { code: "+247", name: "Ascension Island", flag: "🇦🇨", placeholder: "650 1234" },
    { code: "+248", name: "Seychelles", flag: "🇸🇨", placeholder: "2 510 123" },
    { code: "+249", name: "Sudan", flag: "🇸🇩", placeholder: "091 123 4567" },
    { code: "+250", name: "Rwanda", flag: "🇷🇼", placeholder: "072 123 4567" },
    { code: "+251", name: "Ethiopia", flag: "🇪🇹", placeholder: "091 123 4567" },
    { code: "+252", name: "Somalia", flag: "🇸🇴", placeholder: "61 123 4567" },
    { code: "+253", name: "Djibouti", flag: "🇩🇯", placeholder: "77 123 456" },
    { code: "+255", name: "Tanzania", flag: "🇹🇿", placeholder: "071 123 4567" },
    { code: "+256", name: "Uganda", flag: "🇺🇬", placeholder: "070 123 4567" },
    { code: "+257", name: "Burundi", flag: "🇧🇮", placeholder: "79 123 456" },
    { code: "+258", name: "Mozambique", flag: "🇲🇿", placeholder: "82 123 4567" },
    { code: "+260", name: "Zambia", flag: "🇿🇲", placeholder: "095 123 4567" },
    { code: "+261", name: "Madagascar", flag: "🇲🇬", placeholder: "032 12 345 67" },
    { code: "+262", name: "Reunion", flag: "🇷🇪", placeholder: "0692 12 34 56" },
    { code: "+263", name: "Zimbabwe", flag: "🇿🇼", placeholder: "071 123 456" },
    { code: "+264", name: "Namibia", flag: "🇳🇦", placeholder: "081 123 4567" },
    { code: "+265", name: "Malawi", flag: "🇲🇼", placeholder: "099 123 4567" },
    { code: "+266", name: "Lesotho", flag: "🇱🇸", placeholder: "501 123 456" },
    { code: "+267", name: "Botswana", flag: "🇧🇼", placeholder: "71 123 456" },
    { code: "+268", name: "Eswatini", flag: "🇸🇿", placeholder: "761 123 456" },
    { code: "+269", name: "Comoros", flag: "🇰🇲", placeholder: "321 1234" },
    { code: "+290", name: "Saint Helena", flag: "🇸🇭", placeholder: "659 1234" },
    { code: "+291", name: "Eritrea", flag: "🇪🇷", placeholder: "07 123 456" },
    { code: "+297", name: "Aruba", flag: "🇦🇼", placeholder: "560 1234" },
    { code: "+298", name: "Faroe Islands", flag: "🇫🇴", placeholder: "211234" },
    { code: "+299", name: "Greenland", flag: "🇬🇱", placeholder: "221234" },
    { code: "+350", name: "Gibraltar", flag: "🇬🇮", placeholder: "571 12345" },
    { code: "+352", name: "Luxembourg", flag: "🇱🇺", placeholder: "621 123 456" },
    { code: "+353", name: "Ireland", flag: "🇮🇪", placeholder: "083 123 4567" },
    { code: "+354", name: "Iceland", flag: "🇮🇸", placeholder: "611 1234" },
    { code: "+355", name: "Albania", flag: "🇦🇱", placeholder: "067 123 4567" },
    { code: "+356", name: "Malta", flag: "🇲🇹", placeholder: "799 12345" },
    { code: "+357", name: "Cyprus", flag: "🇨🇾", placeholder: "961 12345" },
    { code: "+359", name: "Bulgaria", flag: "🇧🇬", placeholder: "088 123 4567" },
    { code: "+370", name: "Lithuania", flag: "🇱🇹", placeholder: "601 12345" },
    { code: "+371", name: "Latvia", flag: "🇱🇻", placeholder: "200 12345" },
    { code: "+372", name: "Estonia", flag: "🇪🇪", placeholder: "501 1234" },
    { code: "+373", name: "Moldova", flag: "🇲🇩", placeholder: "068 123 456" },
    { code: "+374", name: "Armenia", flag: "🇦🇲", placeholder: "091 123 456" },
    { code: "+375", name: "Belarus", flag: "🇧🇾", placeholder: "029 123 4567" },
    { code: "+376", name: "Andorra", flag: "🇦🇩", placeholder: "606 123 456" },
    { code: "+377", name: "Monaco", flag: "🇲🇨", placeholder: "06 12 34 56 78" },
    { code: "+378", name: "San Marino", flag: "🇸🇲", placeholder: "333 123456" },
    { code: "+379", name: "Vatican City", flag: "🇻🇦", placeholder: "333 123456" },
    { code: "+381", name: "Serbia", flag: "🇷🇸", placeholder: "061 123 4567" },
    { code: "+382", name: "Montenegro", flag: "🇲🇪", placeholder: "067 123 456" },
    { code: "+383", name: "Kosovo", flag: "🇽🇰", placeholder: "049 123 456" },
    { code: "+385", name: "Croatia", flag: "🇭🇷", placeholder: "091 123 4567" },
    { code: "+386", name: "Slovenia", flag: "🇸🇮", placeholder: "031 123 456" },
    { code: "+387", name: "Bosnia and Herzegovina", flag: "🇧🇦", placeholder: "061 123 456" },
    { code: "+389", name: "North Macedonia", flag: "🇲🇰", placeholder: "070 123 456" },
    { code: "+420", name: "Czech Republic", flag: "🇨🇿", placeholder: "601 123 456" },
    { code: "+421", name: "Slovakia", flag: "🇸🇰", placeholder: "0911 123 456" },
    { code: "+423", name: "Liechtenstein", flag: "🇱🇮", placeholder: "660 123 456" },
    { code: "+500", name: "Falkland Islands", flag: "🇫🇰", placeholder: "51234" },
    { code: "+501", name: "Belize", flag: "🇧🇿", placeholder: "622 1234" },
    { code: "+502", name: "Guatemala", flag: "🇬🇹", placeholder: "5512 3456" },
    { code: "+503", name: "El Salvador", flag: "🇸🇻", placeholder: "7012 3456" },
    { code: "+504", name: "Honduras", flag: "🇭🇳", placeholder: "9123 4567" },
    { code: "+505", name: "Nicaragua", flag: "🇳🇮", placeholder: "8712 3456" },
    { code: "+506", name: "Costa Rica", flag: "🇨🇷", placeholder: "8312 3456" },
    { code: "+507", name: "Panama", flag: "🇵🇦", placeholder: "6712 3456" },
    { code: "+508", name: "Saint Pierre and Miquelon", flag: "🇵🇲", placeholder: "551 1234" },
    { code: "+509", name: "Haiti", flag: "🇭🇹", placeholder: "3412 3456" },
    { code: "+590", name: "Guadeloupe", flag: "🇬🇵", placeholder: "0690 12 34 56" },
    { code: "+592", name: "Guyana", flag: "🇬🇾", placeholder: "612 3456" },
    { code: "+594", name: "French Guiana", flag: "🇬🇫", placeholder: "0694 12 34 56" },
    { code: "+596", name: "Martinique", flag: "🇲🇶", placeholder: "0696 12 34 56" },
    { code: "+597", name: "Suriname", flag: "🇸🇷", placeholder: "741 1234" },
    { code: "+599", name: "Curaçao", flag: "🇨🇼", placeholder: "9 561 1234" },
    { code: "+674", name: "Nauru", flag: "🇳🇷", placeholder: "555 1234" },
    { code: "+681", name: "Wallis and Futuna", flag: "🇼🇫", placeholder: "721 1234" },
    { code: "+686", name: "Kiribati", flag: "🇰🇮", placeholder: "720 1234" },
    { code: "+687", name: "New Caledonia", flag: "🇳🇨", placeholder: "750 1234" },
    { code: "+689", name: "French Polynesia", flag: "🇵🇫", placeholder: "87 12 34 56" },
    { code: "+850", name: "North Korea", flag: "🇰🇵", placeholder: "191 123 4567" },
    { code: "+852", name: "Hong Kong", flag: "🇭🇰", placeholder: "6123 4567" },
    { code: "+853", name: "Macau", flag: "🇲🇴", placeholder: "6612 3456" },
    { code: "+856", name: "Laos", flag: "🇱🇦", placeholder: "020 1234 5678" },
    { code: "+886", name: "Taiwan", flag: "🇹🇼", placeholder: "0912 345 678" },
    { code: "+960", name: "Maldives", flag: "🇲🇻", placeholder: "777 1234" },
    { code: "+961", name: "Lebanon", flag: "🇱🇧", placeholder: "03 123 456" },
    { code: "+962", name: "Jordan", flag: "🇯🇴", placeholder: "079 123 4567" },
    { code: "+963", name: "Syria", flag: "🇸🇾", placeholder: "093 123 456" },
    { code: "+964", name: "Iraq", flag: "🇮🇶", placeholder: "0790 123 4567" },
    { code: "+965", name: "Kuwait", flag: "🇰🇼", placeholder: "600 12345" },
    { code: "+967", name: "Yemen", flag: "🇾🇪", placeholder: "711 123 456" },
    { code: "+968", name: "Oman", flag: "🇴🇲", placeholder: "921 12345" },
    { code: "+970", name: "Palestine", flag: "🇵🇸", placeholder: "0599 123 456" },
    { code: "+972", name: "Israel", flag: "🇮🇱", placeholder: "052-123-4567" },
    { code: "+973", name: "Bahrain", flag: "🇧🇭", placeholder: "3600 1234" },
    { code: "+974", name: "Qatar", flag: "🇶🇦", placeholder: "3312 3456" },
    { code: "+975", name: "Bhutan", flag: "🇧🇹", placeholder: "17 123 456" },
    { code: "+976", name: "Mongolia", flag: "🇲🇳", placeholder: "8812 3456" },
    { code: "+977", name: "Nepal", flag: "🇳🇵", placeholder: "984 123 4567" },
    { code: "+992", name: "Tajikistan", flag: "🇹🇯", placeholder: "917 123 456" },
    { code: "+993", name: "Turkmenistan", flag: "🇹🇲", placeholder: "66 123 4567" },
    { code: "+994", name: "Azerbaijan", flag: "🇦🇿", placeholder: "050 123 45 67" },
    { code: "+995", name: "Georgia", flag: "🇬🇪", placeholder: "555 12 34 56" },
    { code: "+996", name: "Kyrgyzstan", flag: "🇰🇬", placeholder: "0700 123 456" },
    { code: "+998", name: "Uzbekistan", flag: "🇺🇿", placeholder: "90 123 45 67" },
  ]

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) || country.code.includes(countrySearch),
  )

  // Geolocation hook
  const { city, loading: geoLoading, error: geoError } = useGeolocation()

  // Matrix effect codes
  const matrixCodes = [
    "4bda7c",
    "x1f801",
    "uSr9ub",
    "r31sw",
    "3cqvt",
    "ebwvi",
    "4qd1tu",
    "str5y4",
    "ect2So",
    "xfnpBj",
    "kqjJu",
    "2v46yn",
    "q619ma",
    "wdtqdo",
    "14mkee",
    "pbb3eu",
    "vbncg8",
    "begaSh",
    "7rq",
    "dcboeu",
    "keyxs",
    "3Qehu",
    "N8135s",
    "nx794n",
    "11aqSi",
    "zBcpp",
    "s1xcBm",
    "u91xnm",
    "1s7mec",
    "Y8fmf",
    "11masu",
    "ye1f2t",
  ]

  // Progress steps for global progress bar
  const getProgressSteps = () => {
    const steps = [
      {
        id: "form",
        label: "Config",
        fullLabel: "Configuration",
        mobileLabel: "Config",
        completed: ["form", "verification", "preliminary", "generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "verification",
        label: "Verif",
        fullLabel: "Verification",
        mobileLabel: "Verif",
        completed: ["verification", "preliminary", "generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "preliminary",
        label: "Result",
        fullLabel: "Result",
        mobileLabel: "Resultado",
        completed: ["preliminary", "generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "generating",
        label: "Relat",
        fullLabel: "Report",
        mobileLabel: "Relatório",
        completed: ["generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "offer",
        label: "Desbl",
        fullLabel: "Unlock",
        mobileLabel: "Acesso",
        completed: currentStep === "offer",
      },
    ]
    return steps
  }

  // Timer countdown
  useEffect(() => {
    if (currentStep === "result" || currentStep === "offer") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentStep])

  // Verification progress with dynamic messages
  useEffect(() => {
    if (currentStep === "verification") {
      const messages = [
        { progress: 0, message: "Checking Tinder activity in your area..." },
        { progress: 15, message: "Cross-referencing facial recognition data..." },
        { progress: 30, message: "Analyzing recent login patterns..." },
        { progress: 45, message: "Scanning Bumble, Hinge, and other platforms..." },
        { progress: 60, message: "Detecting suspicious location activity..." },
        { progress: 75, message: "Compiling confidential evidence..." },
        { progress: 90, message: "Almost there - finalizing your report..." },
        { progress: 100, message: "Investigation completed successfully!" },
      ]

      const interval = setInterval(() => {
        setVerificationProgress((prev) => {
          const newProgress = prev + Math.random() * 8 + 2

          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 25)
          if (currentMessage) {
            setVerificationMessage(currentMessage.message)
          }

          if (newProgress >= 100) {
            setTimeout(() => setCurrentStep("preliminary"), 1000)
            return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  // Generating report progress (30 seconds) with geolocation integration
  useEffect(() => {
    if (currentStep === "generating") {
      const baseMessages = [
        { progress: 0, message: "Analyzing profile photos..." },
        { progress: 20, message: "Processing message history..." },
        { progress: 40, message: "Checking last accessed locations..." },
        { progress: 60, message: "Compiling activity data..." },
        { progress: 80, message: "Encrypting sensitive information..." },
        { progress: 95, message: "Finalizing complete report..." },
        { progress: 100, message: "Report generated successfully!" },
      ]

      // Add geolocation-specific message if city is available
      const messages = city
        ? [
            ...baseMessages.slice(0, 2),
            { progress: 30, message: `Analyzing recent activities in the region of ${city}...` },
            ...baseMessages.slice(2),
          ]
        : baseMessages

      const interval = setInterval(() => {
        setGeneratingProgress((prev) => {
          const newProgress = prev + 100 / 75

          if (newProgress >= 33 && !stepCompleted.profilePhotos) {
            setStepCompleted((prev) => ({ ...prev, profilePhotos: true }))
          }
          if (newProgress >= 66 && !stepCompleted.conversations) {
            setStepCompleted((prev) => ({ ...prev, conversations: true }))
          }
          if (newProgress >= 90 && !stepCompleted.finalizing) {
            setStepCompleted((prev) => ({ ...prev, finalizing: true }))
          }

          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 20)
          if (currentMessage) {
            setGeneratingMessage(currentMessage.message)
          }

          if (newProgress >= 100) {
            setTimeout(() => {
              if (stepCompleted.profilePhotos && stepCompleted.conversations && stepCompleted.finalizing) {
                setCurrentStep("result")
              }
            }, 1500)
            return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [currentStep, city, stepCompleted])

  // Updated sales proof effect - now includes generating step
  useEffect(() => {
    if (currentStep === "generating" || currentStep === "result" || currentStep === "offer") {
      const showProof = () => {
        if (Math.random() < 0.7) {
          setShowSalesProof(true)
          setTimeout(() => setShowSalesProof(false), 6000)
        }
      }

      const initialTimeout = setTimeout(showProof, 5000)
      const interval = setInterval(showProof, 25000)

      return () => {
        clearTimeout(initialTimeout)
        clearInterval(interval)
      }
    }
  }, [currentStep])

  const fetchWhatsAppPhoto = async (phone: string) => {
    if (phone.length < 10) return

    setIsLoadingPhoto(true)
    setPhotoError("")

    try {
      const response = await fetch("/api/whatsapp-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phone }),
      })

      // --- NEW robust handling (replaces old !response.ok throw) ---
      let data: any = null

      try {
        data = await response.json()
      } catch {
        // if the body is not valid JSON we still want to fall back safely
        data = {}
      }

      // When the API answers with non-200 we still carry on with a safe payload
      if (!response.ok || !data?.success) {
        setProfilePhoto(
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        )
        setIsPhotoPrivate(true)
        setPhotoError("Could not load photo")
        return
      }

      // ✅ Successful, public photo
      setProfilePhoto(data.result)
      setIsPhotoPrivate(!!data.is_photo_private)
    } catch (error) {
      console.error("Erro ao buscar foto:", error)
      setProfilePhoto(
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      )
      setIsPhotoPrivate(true)
      setPhotoError("Error loading photo")
    } finally {
      setIsLoadingPhoto(false)
    }
  }

  const handlePhoneChange = (value: string) => {
    // Ensure the value starts with the selected country code
    let formattedValue = value
    if (!value.startsWith(selectedCountry.code)) {
      // If user is typing a number without country code, prepend it
      if (value && !value.startsWith("+")) {
        formattedValue = selectedCountry.code + " " + value
      } else if (value.startsWith("+") && !value.startsWith(selectedCountry.code)) {
        // User typed a different country code, keep it as is
        formattedValue = value
      } else {
        formattedValue = selectedCountry.code + " " + value.replace(selectedCountry.code, "").trim()
      }
    }

    setPhoneNumber(formattedValue)

    // Extract just the numbers for API call
    const cleanPhone = formattedValue.replace(/[^0-9]/g, "")
    if (cleanPhone.length >= 10) {
      fetchWhatsAppPhoto(cleanPhone)
    } else {
      setProfilePhoto(null)
      setIsPhotoPrivate(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCountryDropdown) {
        const target = event.target as Element
        if (!target.closest(".relative")) {
          setShowCountryDropdown(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showCountryDropdown])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Updated blocked images with new chat screenshots
  const blockedImages = [
    "https://i.ibb.co/PZmmjcxb/CHAT1.png",
    "https://i.ibb.co/20581vtC/CHAT2.png",
    "https://i.ibb.co/LzFZdXXH/CHAT3.png",
    "https://i.ibb.co/kvWFRct/CHAT4.png",
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blockedImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blockedImages.length) % blockedImages.length)
  }

  // Auto-scroll do carrossel
  useEffect(() => {
    if (currentStep === "result") {
      const interval = setInterval(nextSlide, 4000)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateFakeProfiles = useCallback(() => {
    const profiles = []

    const shouldUseCustomPhotos1824 = selectedGender === "masculino" && ageRange === "18-24"
    const shouldUseCustomPhotos2534 = selectedGender === "masculino" && ageRange === "25-34"
    const shouldUseCustomPhotos3544 = selectedGender === "masculino" && ageRange === "35-44"
    const shouldUseCustomPhotos4554 = selectedGender === "masculino" && ageRange === "45-54"
    const shouldUseCustomPhotosMale1824 = selectedGender === "feminino" && ageRange === "18-24"
    const shouldUseCustomPhotosMale2534 = selectedGender === "feminino" && ageRange === "25-34"
    const shouldUseCustomPhotosMale3544 = selectedGender === "feminino" && ageRange === "35-44"
    const shouldUseCustomPhotosMale4554 = selectedGender === "feminino" && ageRange === "45-54"

    const shuffledPhotoIndices1824 = shouldUseCustomPhotos1824
      ? [...Array(femalePhotos1824.length)].map((_, i) => i).sort(() => Math.random() - 0.5)
      : []

    const shuffledPhotoIndices2534 = shouldUseCustomPhotos2534
      ? [...Array(femalePhotos2534.length)].map((_, i) => i).sort(() => Math.random() - 0.5)
      : []

    const shuffledPhotoIndices3544 = shouldUseCustomPhotos3544
      ? [...Array(femalePhotos3544.length)].map((_, i) => i).sort(() => Math.random() - 0.5)
      : []

    const shuffledPhotoIndices4554 = shouldUseCustomPhotos4554
      ? [...Array(femalePhotos4554.length)].map((_, i) => i).sort(() => Math.random() - 0.5)
      : []

    const shuffledPhotoIndicesMale1824 = shouldUseCustomPhotosMale1824
      ? [...Array(malePhotos1824.length)].map((_, i) => i).sort(() => Math.random() - 0.5)
      : []

    const shuffledPhotoIndicesMale2534 = shouldUseCustomPhotosMale2534
      ? [...Array(malePhotos2534.length)].map((_, i) => i).sort(() => Math.random() - 0.5)
      : []

    const shuffledPhotoIndicesMale3544 = shouldUseCustomPhotosMale3544
      ? [...Array(malePhotos3544.length)].map((_, i) => i).sort(() => Math.random() - 0.5)
      : []

    const shuffledPhotoIndicesMale4554 = shouldUseCustomPhotosMale4554
      ? [...Array(malePhotos4554.length)].map((_, i) => i).sort(() => Math.random() - 0.5)
      : []

    for (let i = 0; i < 3; i++) {
      let names, targetGender, targetAge

      if (selectedGender === "nao-binario") {
        // Random selection for non-binary
        const genders = ["masculino", "feminino"]
        targetGender = genders[Math.floor(Math.random() * genders.length)]
        const ages = ["18-24", "25-34", "35-44", "45-54"]
        targetAge = ages[Math.floor(Math.random() * ages.length)]
      } else {
        // Opposite gender for binary selections
        targetGender = selectedGender === "masculino" ? "feminino" : "masculino"
        targetAge = ageRange
      }

      names = targetGender === "masculino" ? maleNames[targetAge] : femaleNames[targetAge]
      const name = names[Math.floor(Math.random() * names.length)]
      const age = Math.floor(Math.random() * 7) + Number.parseInt(targetAge.split("-")[0])

      let profileImage = `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=400&fit=crop&crop=face`

      if (shouldUseCustomPhotos1824 && shuffledPhotoIndices1824[i] !== undefined) {
        profileImage = femalePhotos1824[shuffledPhotoIndices1824[i]]
      } else if (shouldUseCustomPhotos2534 && shuffledPhotoIndices2534[i] !== undefined) {
        profileImage = femalePhotos2534[shuffledPhotoIndices2534[i]]
      } else if (shouldUseCustomPhotos3544 && shuffledPhotoIndices3544[i] !== undefined) {
        profileImage = femalePhotos3544[shuffledPhotoIndices3544[i]]
      } else if (shouldUseCustomPhotos4554 && shuffledPhotoIndices4554[i] !== undefined) {
        profileImage = femalePhotos4554[shuffledPhotoIndices4554[i]]
      } else if (shouldUseCustomPhotosMale1824 && shuffledPhotoIndicesMale1824[i] !== undefined) {
        profileImage = malePhotos1824[shuffledPhotoIndicesMale1824[i]]
      } else if (shouldUseCustomPhotosMale2534 && shuffledPhotoIndicesMale2534[i] !== undefined) {
        profileImage = malePhotos2534[shuffledPhotoIndicesMale2534[i]]
      } else if (shouldUseCustomPhotosMale3544 && shuffledPhotoIndicesMale3544[i] !== undefined) {
        profileImage = malePhotos3544[shuffledPhotoIndicesMale3544[i]]
      } else if (shouldUseCustomPhotosMale4554 && shuffledPhotoIndicesMale4554[i] !== undefined) {
        profileImage = malePhotos4554[shuffledPhotoIndicesMale4554[i]]
      }

      profiles.push({
        name,
        age,
        lastSeen: `${Math.floor(Math.random() * 24)}h ago`,
        description: "Active user, frequently online",
        image: profileImage,
      })
    }

    setGeneratedProfiles(profiles)
    return profiles
  }, [
    selectedGender,
    ageRange,
    femalePhotos1824,
    femalePhotos2534,
    femalePhotos3544,
    femalePhotos4554,
    malePhotos1824,
    malePhotos2534,
    malePhotos3544,
    malePhotos4554,
  ])

  useEffect(() => {
    if (currentStep === "result") {
      generateFakeProfiles()
    }
  }, [currentStep, generateFakeProfiles])

  const canVerify =
    phoneNumber.length >= 10 &&
    selectedGender &&
    profilePhoto &&
    lastTinderUse &&
    cityChange &&
    ageRange &&
    userEmail.includes("@")

  // Function to submit email and proceed to verification
  const handleSubmitForm = async () => {
    if (!canVerify) return

    setIsSubmittingEmail(true)
    try {
      await fetch("https://get.flwg.cc/webhook/c609e920b1a68fa7895e26a8b509d6f32de16bf15b9db6d139d50156e4719143", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag: "tinder check en - usuario criado",
          evento: "Usuário Criado",
          email: userEmail,
          phone: phoneNumber,
        }),
      })
    } catch (error) {
      console.error("Error submitting email:", error)
    } finally {
      setIsSubmittingEmail(false)
      setCurrentStep("verification")
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Global Progress Bar - Mobile Optimized */}
      {currentStep !== "landing" && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="stepper-container overflow-x-auto px-3 py-3">
            <div className="flex items-center gap-2 min-w-max">
              {getProgressSteps().map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="stepper-step flex items-center gap-2 min-w-[80px] sm:min-w-[100px]">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                        step.completed
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.completed ? "✓" : index + 1}
                    </div>
                    <span
                      className={`font-medium transition-colors duration-300 text-xs sm:text-sm whitespace-nowrap ${
                        step.completed ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      <span className="block sm:hidden">{step.mobileLabel}</span>
                      <span className="hidden sm:block">{step.fullLabel}</span>
                    </span>
                  </div>
                  {index < getProgressSteps().length - 1 && (
                    <div className="w-6 sm:w-8 h-px bg-gray-300 mx-2 sm:mx-3 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sales Proof Popup - Dynamic Social Proof */}
      <AnimatePresence>
        {showSalesProof && (currentStep === "generating" || currentStep === "result" || currentStep === "offer") && (
          <SalesProofPopup show={showSalesProof} onClose={() => setShowSalesProof(false)} />
        )}
      </AnimatePresence>

      <div className={currentStep !== "landing" ? "pt-16 sm:pt-20" : ""}>
        <AnimatePresence mode="wait">
          {/* Landing Page - Mobile Optimized */}
          {currentStep === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] relative overflow-hidden"
            >
              {/* Matrix Background - Reduced for mobile performance */}
              <div className="absolute inset-0 opacity-10 sm:opacity-20">
                {matrixCodes.slice(0, 15).map((code, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-green-400 text-xs font-mono"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  >
                    {code}
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#FF0066] to-[#FF3333] rounded-2xl mb-6 sm:mb-8 shadow-2xl"
                  >
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 px-2 leading-tight"
                  >
                    That Gut Feeling Won't Go Away...
                    <br />
                    <span className="text-[#FF3B30] text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold">
                      And You're Right to Trust It
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#CCCCCC] mb-6 text-base sm:text-lg md:text-xl px-4 max-w-3xl mx-auto font-medium"
                  >
                    Stop losing sleep wondering if they're still swiping. Get the answers you need - completely
                    anonymously.
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="inline-flex items-center gap-2 bg-green-600/20 text-green-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm mt-4 border border-green-500/30"
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">Advanced Detection System - Updated June 2025</span>
                  </motion.div>
                </div>

                {/* Features - Mobile Optimized */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ See their last login (even when they say they're 'done' with apps)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Discover where they're really swiping from
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Access the conversations they don't want you to see
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Your investigation stays completely private
                    </span>
                  </div>
                </motion.div>

                {/* CTA - Mobile Optimized with Fixed Button Text */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="text-center mb-12 sm:mb-16 px-4"
                >
                  <Button
                    onClick={() => setCurrentStep("form")}
                    className="bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 px-6 sm:px-8 text-sm sm:text-base md:text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 w-full max-w-md mx-auto flex items-center justify-center text-center overflow-hidden"
                  >
                    <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                      🔍 GET THE TRUTH – START ANONYMOUS SEARCH
                    </span>
                  </Button>

                  <p className="text-sm text-gray-300 mt-4 font-medium">
                    100% anonymous investigation. They'll never know you checked.
                  </p>
                </motion.div>
              </div>

              {/* Bottom Section - Mobile Optimized */}
              <div className="bg-white py-12 sm:py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#333333] mb-4">
                      You're Not Paranoid -
                    </h2>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] to-[#FF3333] mb-6">
                      You're Protecting Yourself
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                      Stop second-guessing your instincts. Get the clarity you need to make informed decisions about
                      your relationship.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">RECENT ACTIVITY</h4>
                      <p className="text-xs sm:text-sm text-gray-600">See when they last used dating apps</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">EXACT LOCATION</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Where they've been swiping</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">HIDDEN PHOTOS</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Photos they don't want you to see</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">PRIVATE CONVERSATIONS</h4>
                      <p className="text-xs sm:text-sm text-gray-600">What they're really saying to others</p>
                    </div>
                  </div>

                  {/* Testimonials Section - Enhanced with validation focus */}
                  <div className="text-center mb-8 sm:mb-12">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#333333] mb-6 sm:mb-8 px-2">
                      You're Not Alone - See What Others Discovered
                    </h3>

                    <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 mb-6 sm:mb-8">
                      {/* Sarah's Testimonial */}
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                          alt="Sarah's photo"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Sarah, 32</p>
                            <p className="text-xs sm:text-sm text-green-600 font-medium">✓ Verified User</p>
                          </div>
                          <div className="mb-3">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                            <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">
                              I knew something was off. The report confirmed my worst fears, but at least now I could
                              make an informed decision instead of living in constant anxiety.
                            </p>
                          </div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>

                      {/* Jennifer's Testimonial */}
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D"
                          alt="Jennifer's photo"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1580489944761-15a19d654956?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Jennifer, 28</p>
                            <p className="text-xs sm:text-sm text-blue-600 font-medium">
                              Investigation completed June 2025
                            </p>
                          </div>
                          <div className="mb-3">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                            <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">
                              Best $17 I ever spent. Saved me months of wondering and gave me the closure I needed. My
                              instincts were right all along.
                            </p>
                          </div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>

                      {/* Michelle's Testimonial */}
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
                          alt="Michelle's photo"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Michelle, 35</p>
                            <p className="text-xs sm:text-sm text-green-600 font-medium">✓ Verified User</p>
                          </div>
                          <div className="mb-3">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                            <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">
                              I felt guilty for checking, but my instincts were right. Now I can move on with confidence
                              instead of living in doubt.
                            </p>
                          </div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Single CTA Button - Fixed Text Overflow */}
                    <Button
                      onClick={() => setCurrentStep("form")}
                      className="bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base md:text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full max-w-sm mx-auto flex items-center justify-center text-center overflow-hidden"
                    >
                      <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                        🔍 START MY ANONYMOUS INVESTIGATION
                      </span>
                    </Button>
                  </div>

                  {/* Bottom Privacy Notice */}
                  <div className="text-center px-4">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-2 font-medium">
                      <Shield className="w-4 h-4" />
                      100% anonymous - Your investigation stays completely private
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Form - Mobile Optimized */}
          {currentStep === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-[#6C63FF] relative overflow-hidden"
            >
              {/* Floating dots - Reduced for mobile */}
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-lg">
                  {/* Header */}
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl">
                      <Wifi className="w-8 h-8 sm:w-10 sm:h-10 text-[#6C63FF]" />
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                      🔍 Help Us Find What They're Hiding
                    </h1>
                    <p className="text-gray-200 text-sm sm:text-base px-4 leading-relaxed">
                      The more details you provide, the deeper we can dig. Everything stays 100% anonymous.
                    </p>
                  </div>

                  {/* Form */}
                  <Card className="bg-white rounded-2xl shadow-lg border-0">
                    <CardContent className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                      {/* Photo Upload - Moved to first position */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          Upload Their Photo for Facial Recognition
                        </label>
                        <div className="text-center">
                          {uploadedPhoto ? (
                            <div className="relative inline-block">
                              <img
                                src={uploadedPhoto || "/placeholder.svg"}
                                alt="Uploaded"
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-blue-500 shadow-lg"
                              />
                              <button
                                onClick={() => setUploadedPhoto(null)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mx-auto cursor-pointer hover:border-blue-500 transition-colors">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-3 font-medium">
                          We'll scan across all dating platforms to find matching profiles - even ones they think are
                          hidden.
                        </p>
                      </div>

                      {/* Phone Number - Now second */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-2 sm:mb-3">
                          WhatsApp Number They Use
                        </label>
                        <div className="flex gap-2 sm:gap-3">
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                              className="bg-gray-100 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-gray-600 flex-shrink-0 font-medium text-sm sm:text-base flex items-center gap-2 hover:bg-gray-200 transition-colors duration-200 min-w-[80px] sm:min-w-[90px]"
                            >
                              <span className="text-lg">{selectedCountry.flag}</span>
                              <span>{selectedCountry.code}</span>
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {showCountryDropdown && (
                              <div className="absolute top-full left-0 mt-1 bg-white border rounded-xl shadow-lg z-50 w-80 max-h-60 overflow-y-auto">
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Search country..."
                                    value={countrySearch}
                                    onChange={(e) => setCountrySearch(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                  />
                                </div>
                                {filteredCountries.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(country)
                                      setShowCountryDropdown(false)
                                      setCountrySearch("")
                                      // Update phone number with new country code
                                      const currentNumber = phoneNumber.replace(/^\+\d+\s*/, "")
                                      setPhoneNumber(country.code + " " + currentNumber)
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm"
                                  >
                                    <span className="text-lg">{country.flag}</span>
                                    <span className="font-medium">{country.code}</span>
                                    <span className="text-gray-600">{country.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <Input
                            type="tel"
                            placeholder={selectedCountry.placeholder}
                            value={phoneNumber}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            className="flex-1 py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
                          This helps us track their device activity and cross-reference with dating app usage patterns.
                        </p>

                        {/* WhatsApp Photo Preview */}
                        {(profilePhoto || isLoadingPhoto) && (
                          <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3 sm:gap-4">
                              {isLoadingPhoto ? (
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-xl animate-pulse" />
                              ) : (
                                <img
                                  src={profilePhoto || "/placeholder.svg"}
                                  alt="WhatsApp Profile"
                                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border-2 border-gray-200"
                                />
                              )}
                              <div className="flex-1">
                                <p className="font-semibold text-[#333333] text-sm sm:text-base">
                                  WhatsApp Profile Found
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  {isPhotoPrivate ? "Private photo detected" : "Profile photo loaded"}
                                </p>
                              </div>
                              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Gender Selection */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          What gender are they?
                        </label>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          {[
                            { value: "masculino", label: "Male", icon: "👨" },
                            { value: "feminino", label: "Female", icon: "👩" },
                            { value: "nao-binario", label: "Non-binary", icon: "🧑" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setSelectedGender(option.value)}
                              className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                                selectedGender === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="text-lg sm:text-xl mb-1 sm:mb-2">{option.icon}</div>
                              <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Age Range */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          How Old Are They?
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          {[
                            { value: "18-24", label: "18-24 years" },
                            { value: "25-34", label: "25-34 years" },
                            { value: "35-44", label: "35-44 years" },
                            { value: "45-54", label: "45+ years" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setAgeRange(option.value)}
                              className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                                ageRange === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                            </button>
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
                          This helps us narrow down the search parameters across dating platforms.
                        </p>
                      </div>

                      {/* Timeline Questions */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          When Did You Start Suspecting?
                        </label>
                        <div className="space-y-2 sm:space-y-3">
                          {[
                            { value: "week", label: "Within the last week", desc: "(recent behavior changes)" },
                            { value: "month", label: "Past month", desc: "(gradual distance/phone hiding)" },
                            { value: "longer", label: "More than a month", desc: "(ongoing gut feeling)" },
                            { value: "sure", label: "I just need to know for sure", desc: "" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setLastTinderUse(option.value)}
                              className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                lastTinderUse === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="font-medium text-sm sm:text-base">{option.label}</div>
                              {option.desc && (
                                <div className="text-xs sm:text-sm text-gray-500 mt-1">{option.desc}</div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Location Questions */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          Have They Been "Working Late" or Traveling?
                        </label>
                        <div className="space-y-2 sm:space-y-3">
                          {[
                            { value: "yes", label: "Yes", desc: '"New job demands" or unexplained trips' },
                            { value: "no", label: "No", desc: "Behavior changes happened at home" },
                            { value: "unknown", label: "I don't know", desc: "They're secretive about schedule" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setCityChange(option.value)}
                              className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                cityChange === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="font-medium text-sm sm:text-base">{option.label}</div>
                              <div className="text-xs sm:text-sm text-gray-500 mt-1">{option.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Email Field - Added here */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-2 sm:mb-3">
                          Your Email Address
                        </label>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
                          We'll send your complete report to this email address. 100% confidential.
                        </p>
                      </div>

                      {/* Submit Button - Fixed Text Overflow */}
                      <Button
                        onClick={handleSubmitForm}
                        disabled={!canVerify || isSubmittingEmail}
                        className={`w-full py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold rounded-xl transition-all duration-300 overflow-hidden ${
                          canVerify && !isSubmittingEmail
                            ? "bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <span className="block text-center leading-tight px-2">
                          {isSubmittingEmail ? "Processing..." : "🔍 START INVESTIGATION - FIND THE TRUTH"}
                        </span>
                      </Button>

                      {/* Trust Signal */}
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                          <Lock className="w-4 h-4" />
                          Your data is encrypted and automatically deleted after 24 hours
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {/* Verification - Mobile Optimized */}
          {currentStep === "verification" && (
            <motion.div
              key="verification"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-md">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                      <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-4 sm:mb-6">
                      🔍 Scanning All Dating Platforms...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={verificationProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{verificationMessage}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Tinder, Bumble, Hinge scanning...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Facial recognition processing...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Location data analysis...</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Secure and encrypted connection - No traces left behind
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Preliminary Results - Mobile Optimized */}
          {currentStep === "preliminary" && (
            <motion.div
              key="preliminary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-lg">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    {/* Alert Header */}
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg animate-pulse">
                        <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#333333] mb-3 sm:mb-4">
                        We Found What You Were Looking For...
                      </h2>
                    </div>

                    {/* Alert Box */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
                        <h3 className="text-lg sm:text-xl font-bold text-red-700">ACTIVE DATING PROFILES DETECTED</h3>
                      </div>
                      <p className="text-sm sm:text-base text-red-600 font-medium leading-relaxed">
                        Our system discovered multiple active profiles linked to this person across 3 different dating
                        platforms.
                      </p>
                    </div>

                    {/* Key Findings */}
                    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            Last Active: 18 hours ago
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Despite claiming they 'deleted everything'...
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            3 Dating Apps Currently Active
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">Tinder, Bumble, and one premium platform</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            Recent Conversations Detected
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Active messaging with multiple matches this week
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Next Step Box */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs sm:text-sm font-bold">💡</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-blue-700">
                          What You'll See in the Full Report:
                        </h3>
                      </div>
                      <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-blue-600">
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Screenshots of all active profiles
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Recent conversations and what they're saying
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Exact locations where they've been swiping
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Timeline of all activity (you'll be shocked)
                        </li>
                      </ul>
                    </div>

                    {/* CTA Button - Fixed Text Overflow */}
                    <Button
                      onClick={() => setCurrentStep("generating")}
                      className="w-full bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden flex items-center justify-center text-center"
                    >
                      <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                        🔓 UNLOCK COMPLETE EVIDENCE – SEE EVERYTHING
                      </span>
                    </Button>

                    {/* Reassurance */}
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Complete anonymity guaranteed - They'll never know you checked
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Generating Report - Mobile Optimized */}
          {currentStep === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-md">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-4 sm:mb-6">
                      📊 Generating Complete Report...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={generatingProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{generatingMessage}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div
                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                          stepCompleted.profilePhotos ? "bg-green-50" : "bg-blue-50"
                        }`}
                      >
                        {stepCompleted.profilePhotos ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        )}
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Profile photos analyzed</span>
                      </div>
                      <div
                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                          stepCompleted.conversations
                            ? "bg-green-50"
                            : stepCompleted.profilePhotos
                              ? "bg-blue-50"
                              : "bg-gray-50"
                        }`}
                      >
                        {stepCompleted.conversations ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        ) : stepCompleted.profilePhotos ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            stepCompleted.conversations || stepCompleted.profilePhotos
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          Processing conversations...
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                          stepCompleted.finalizing
                            ? "bg-green-50"
                            : stepCompleted.conversations
                              ? "bg-blue-50"
                              : "bg-gray-50"
                        }`}
                      >
                        {stepCompleted.finalizing ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        ) : stepCompleted.conversations ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            stepCompleted.finalizing || stepCompleted.conversations ? "text-gray-700" : "text-gray-500"
                          }`}
                        >
                          Finalizing report...
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Encrypting sensitive data for your privacy
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Result - Mobile Optimized */}
          {currentStep === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] px-4 py-6 sm:py-8"
            >
              <div className="container mx-auto max-w-4xl">
                {(profilePhoto || uploadedPhoto) && (
                  <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="relative">
                      <img
                        src={uploadedPhoto || profilePhoto || ""}
                        alt="Profile"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      {isPhotoPrivate && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                          <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Alert Banners */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                      <div>
                        <h3 className="font-bold text-sm sm:text-base">🚨 PROFILE FOUND - THEY ARE ACTIVE ON TINDER</h3>
                        <p className="text-xs sm:text-sm opacity-90">Last seen: Online now</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                      <div>
                        <h3 className="font-bold text-sm sm:text-base">⚠️ ATTENTION: ACTIVE PROFILE FOUND!</h3>
                        <p className="text-xs sm:text-sm opacity-90">
                          We confirm this number is linked to an ACTIVE Tinder profile. Latest usage records detected in{" "}
                          {city || "your area"}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-red-500 mb-1">6</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">MATCHES (7 DAYS)</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500 mb-1">30</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">LIKES (7 DAYS)</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-purple-500 mb-1">4</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">ACTIVE CHATS</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-green-500 mb-1">18h</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">LAST ACTIVE</div>
                  </div>
                </div>

                {/* Recent Matches */}
                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">
                      🔥 RECENT MATCHES FOUND
                    </h3>

                    <div className="space-y-4">
                      {generatedProfiles.map((profile, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="relative">
                            {profile.image ? (
                              <img
                                src={profile.image || "/placeholder.svg"}
                                alt={profile.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center">
                                <User className="w-6 h-6 text-pink-600" />
                              </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900">
                                {profile.name}, {profile.age}
                              </h4>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <p className="text-sm text-gray-600">Last seen: {profile.lastSeen}</p>
                            <p className="text-sm text-green-600">Active chat: frequently online</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Photos Section */}
                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">📸 CENSORED PHOTOS</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      See all their profile photos (including the ones you've never seen)
                    </p>

                    {/* Carousel */}
                    <div className="relative">
                      <div className="overflow-hidden rounded-xl">
                        <div
                          className="flex transition-transform duration-300 ease-in-out"
                          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                          {blockedImages.map((image, index) => (
                            <div key={index} className="w-full flex-shrink-0 relative">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Chat conversation ${index + 1}`}
                                className="w-full h-48 sm:h-64 object-cover"
                                style={{ filter: "blur(8px) brightness(0.7)" }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <div className="text-center">
                                  <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white mx-auto mb-2 opacity-80" />
                                  <p className="text-white text-xs font-bold opacity-80">BLOCKED</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Carousel Controls */}
                      <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Dots Indicator */}
                      <div className="flex justify-center gap-2 mt-4">
                        {blockedImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                              index === currentSlide ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Unlock Section */}
                <Card className="bg-white rounded-2xl shadow-lg border-0">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                        <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#333333] mb-3 sm:mb-4">
                        🔓 UNLOCK COMPLETE REPORT
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                        Get instant access to the full report with uncensored photos and complete conversation history.
                      </p>
                    </div>

                    {/* Emergency Timer Card - Added before checkout button */}
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-xl shadow-lg mb-4 sm:mb-6">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                        <span className="font-bold text-lg sm:text-xl">THE REPORT WILL BE DELETED IN:</span>
                      </div>
                      <div className="text-center mb-3">
                        <div className="text-3xl sm:text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
                      </div>
                      <p className="text-sm sm:text-base text-center leading-relaxed opacity-90">
                        After the time expires, this report will be permanently deleted for privacy reasons. This offer
                        cannot be recovered at a later date.
                      </p>
                    </div>

                    {/* Direct Checkout Button - Fixed Text Overflow */}
                    <Button
                      onClick={() =>
                        window.open("https://pay.mundpay.com/019827bf-dd10-703f-a9cf-64bad0eeb361?ref=", "_blank")
                      }
                      className="w-full bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden"
                    >
                      <span className="block text-center leading-tight px-2">🔓 UNLOCK MY COMPLETE REPORT</span>
                    </Button>

                    <div className="mt-4 sm:mt-6">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Shield className="w-4 h-4" />
                        100% Anonymous - They'll Never Know
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Offer Page - Mobile Optimized */}
          {currentStep === "offer" && (
            <motion.div
              key="offer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] px-4 py-6 sm:py-8"
            >
              <div className="container mx-auto max-w-2xl">
                <Card className="bg-white rounded-2xl shadow-2xl border-0">
                  <CardContent className="p-6 sm:p-8 text-center">
                    {/* Header */}
                    <div className="mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                        <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333333] mb-3 sm:mb-4">
                        You Deserve to Know the Whole Truth
                      </h1>
                      <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                        Stop wondering. Stop losing sleep. Get every detail - completely confidential.
                      </p>
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
                        <p className="text-sm sm:text-base text-red-700 font-semibold leading-relaxed">
                          Your instincts were right. Now see exactly what they've been hiding while looking you in the
                          eye and lying.
                        </p>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="mb-6 sm:mb-8">
                      <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="text-2xl sm:text-3xl text-gray-400 line-through">$47.00</div>
                        <div className="text-4xl sm:text-5xl font-bold text-[#FF0066]">$17.00</div>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold mb-4">
                        🔥 62% OFF - LIMITED TIME
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 font-medium">
                        One-time payment for lifetime access to your complete report
                      </p>
                    </div>

                    {/* What You'll Unlock */}
                    <div className="text-left mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6 text-center">
                        What You'll Unlock:
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium">
                            Every Single Profile Photo (including ones they think you'll never see)
                          </span>
                        </div>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium">
                            Complete Conversation History (see exactly what they're telling other people)
                          </span>
                        </div>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium">
                            Exact Location Data (where they've been 'working late' or 'with friends')
                          </span>
                        </div>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium">
                            Active Matches & Messages (names, photos, and chat frequency)
                          </span>
                        </div>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium">
                            Timeline of All Activity (when they were most active while with you)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Trust Signals */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">100% Anonymous</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">SSL Encryption</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">Instant Access</span>
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                        <span className="font-bold text-red-700 text-sm sm:text-base">OFFER EXPIRES IN:</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">{formatTime(timeLeft)}</div>
                      <p className="text-xs sm:text-sm text-red-600">
                        This is your only chance to access this report. Once deleted, it cannot be recovered.
                      </p>
                    </div>

                    {/* CTA Button - Fixed Text Overflow */}
                    <Button
                      onClick={() => (window.location.href = "/emergency")}
                      className="w-full bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden"
                    >
                      <span className="block text-center leading-tight px-2">
                        🔓 UNLOCK MY REPORT - I'M READY FOR THE TRUTH
                      </span>
                    </Button>

                    {/* Final Reassurance */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                      <p className="text-sm sm:text-base text-blue-700 font-medium leading-relaxed">
                        You're not invading privacy - you're protecting your emotional well-being. You have the right to
                        make informed decisions about your relationship.
                      </p>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                          alt="Sarah M."
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-sm sm:text-base">Sarah M.</p>
                            <p className="text-xs sm:text-sm text-green-600 font-medium">✓ Verified User</p>
                          </div>
                          <p className="text-sm sm:text-base text-gray-600 italic leading-relaxed">
                            "I wish I had done this months ago. Would have saved me so much anxiety and wasted time."
                          </p>
                          <div className="flex items-center text-[#FFD700] text-sm mt-2">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
