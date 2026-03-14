import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div>
      HomePage
      <Button className="mt-4" onClick={() => navigate("/chat")}>
        Go to Chat
      </Button>
    </div>
  )
}
