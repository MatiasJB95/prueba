"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TeamFilters() {
  const [showPremium, setShowPremium] = useState(false)
  const [successRate, setSuccessRate] = useState([70])
  const [participationRate, setParticipationRate] = useState([70])

  return (
    <div className="flex items-center gap-2 ml-auto">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filters</h4>
              <p className="text-sm text-muted-foreground">Refine your team search results</p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-members">Min Members</Label>
                  <Input id="min-members" type="number" defaultValue={3} min={1} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-members">Max Members</Label>
                  <Input id="max-members" type="number" defaultValue={10} min={1} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="success-rate">Min Success Rate: {successRate}%</Label>
                </div>
                <Slider
                  id="success-rate"
                  min={0}
                  max={100}
                  step={5}
                  value={successRate}
                  onValueChange={setSuccessRate}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="participation-rate">Min Participation Rate: {participationRate}%</Label>
                </div>
                <Slider
                  id="participation-rate"
                  min={0}
                  max={100}
                  step={5}
                  value={participationRate}
                  onValueChange={setParticipationRate}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="premium" checked={showPremium} onCheckedChange={setShowPremium} />
                <Label htmlFor="premium">Show Premium Teams Only</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Area</Label>
                <Select>
                  <SelectTrigger id="area">
                    <SelectValue placeholder="All Areas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="data">Data</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="ops">Ops</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Sector</Label>
                <Select>
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="All Sectors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sectors</SelectItem>
                    <SelectItem value="fintech">Fintech</SelectItem>
                    <SelectItem value="edtech">Edtech</SelectItem>
                    <SelectItem value="insurtech">Insurtech</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="crypto">Crypto</SelectItem>
                    <SelectItem value="healthtech">Healthtech</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" placeholder="Filter by institution..." />
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" size="sm">
                Reset
              </Button>
              <Button size="sm">Apply Filters</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
