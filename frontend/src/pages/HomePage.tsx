import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useCharacters } from "@/hooks/useCharacter"


export default function HomePage() {
  const { characters, loading, error } = useCharacters()
  const [selected, setSelected] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleJoin = () => {
    if (!selected) return
    // Pass selected character as state
    navigate("/chat", { state: { character: selected } })
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Choose Your Character</h1>
        <p className="text-center text-lg text-gray-600">
          No signup needed — just select your character and start chatting!
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {characters.map((char) => (
          <Card
            key={char.id}
            onClick={() => setSelected(char.id)}
            className={`cursor-pointer transition ${selected === char.id ? "border-2 border-blue-500" : ""}`}
          >
            <CardContent className="flex flex-col items-center p-6">
              <span className="text-4xl">{char.avatar}</span>
              <p className="mt-2 font-medium">{char.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button disabled={!selected} onClick={handleJoin} className="mt-4">
        Join Chat
      </Button>
    </div>
  )
}
