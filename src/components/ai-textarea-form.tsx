"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Sparkles } from "lucide-react";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { useState } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Textarea } from "@/components/ui/textarea";
import { generateCarouselSlidesAction } from "@/app/actions";

const FormSchema = z.object({
  prompt: z.string().min(2, {
    message: "Prompt must be at least 2 characters.",
  }),
});

export function AITextAreaForm() {
  const { setValue }: DocumentFormReturn = useFormContext(); // retrieve those props
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    // Use server action here instead of the local function
    const generatedSlides = await generateCarouselSlidesAction(data.prompt);

    if (generatedSlides) {
      setValue("slides", generatedSlides);
      // TODO Fix toast not working
      toast({
        title: "New carousel generated",
      });
    } else {
      toast({
        title: "Failed to generate carousel",
      });
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg w-full m-auto"
      >
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2 w-full" style={{ maxWidth: 650 }}>
                  <Textarea
                    placeholder="Cole seu texto aqui para organizar em slides..."
                    className="w-full overflow-y-auto"
                    style={{ height: 300 }}
                    {...field}
                  />
                  <Button type="submit" className="w-full">
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <span className="flex flex-row gap-1.5">
                        <Sparkles className="w-4 h-4" /> Format
                      </span>
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
