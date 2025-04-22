"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Topic } from '../types/api'

interface TopicsTableProps {
  topics: Topic[]
  colors: string[]
}

export default function TopicsTable({ topics, colors }: TopicsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Topics</CardTitle>
        <CardDescription>The main topics identified in your data</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <Accordion type="multiple" className="space-y-4">
            {topics.map((topic, index) => (
              <AccordionItem 
                key={topic.id} 
                value={topic.id.toString()}
                className="border rounded-lg px-3"
              >
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: colors[index % colors.length] }} 
                      />
                      <div className="text-left">
                        <div className="font-medium">{topic.name}</div>
                        <div className="text-sm text-muted-foreground">{topic.summary}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{topic.count.toLocaleString()}</Badge>
                      <Badge>{topic.percentage.toFixed(1)}%</Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-3">
                  <div className="text-sm text-muted-foreground pl-7">
                    {topic.description}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
