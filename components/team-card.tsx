import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { TeamType } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface TeamCardProps {
  team: TeamType
}

export function TeamCard({ team }: TeamCardProps) {
  // Calculate star rating from participation rate (1-10 scale)
  const starRating = Math.round(team.participationRate / 10)

  return (
    <Card className="overflow-hidden card-hover max-w-sm">
      {team.isPremium && <div className="premium-badge">Premium</div>}
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={
              team.coverImage ||
              `/placeholder.svg?height=300&width=500&query=${team.sector || "/placeholder.svg"} ${team.vertical} illustration`
            }
            alt={`${team.projectName} illustration`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-24"></div>
          <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {team.vertical}
            </Badge>
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              {team.area}
            </Badge>
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              {team.sector}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">{team.projectName}</h3>
            <p className="text-sm text-muted-foreground">by {team.name}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 mb-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="font-medium">{(team.participationRate / 10).toFixed(1)}</span>
            </div>
            <span className="text-xs text-muted-foreground">Collaboration Rate</span>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">{team.description}</p>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Team Roles</h4>
          <div className="flex flex-wrap gap-2">
            {team.members.map((member, index) => (
              <Badge key={index} variant="outline" className="bg-accent/50">
                {member.role}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Team</h4>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden">
              {team.members.slice(0, 5).map((member, index) => (
                <Avatar key={index} className="h-7 w-7 border-2 border-background">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              ))}
              {team.members.length > 5 && (
                <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-background bg-muted text-xs">
                  +{team.members.length - 5}
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground">{team.memberCount} specialists</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/team/${team.id}`} passHref>
          <Button className="w-full gradient-bg">View Team</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
