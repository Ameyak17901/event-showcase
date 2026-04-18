"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useSupabase } from "@/utils/supabase/supabase-provider";
import { Upload } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

// Validation schema
const addEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000),
  event_date: z.string().min(1, "Event date is required"),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Image must be less than 5MB",
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPG, PNG, and WebP images are allowed",
    ),
  tier: z.enum(["free", "silver", "gold", "platinum"]),
});

type AddEventFormData = z.infer<typeof addEventSchema>;

interface AddEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventCreated?: () => void;
}

export function AddEventDialog({
  open,
  onOpenChange,
  onEventCreated,
}: AddEventDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { supabase, isLoaded: supabaseLoaded } = useSupabase();
  const { isSignedIn } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AddEventFormData>({
    resolver: zodResolver(addEventSchema),
  });

  // Handle image file selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: AddEventFormData) => {
    console.log("Form data:", data);
    if (!supabase) {
      toast.error("Supabase client not initialized");
      return;
    }

    setIsLoading(true);

    try {
      if (!isSignedIn || !supabaseLoaded) {
        toast.error("You must be signed in to create an event");
        setIsLoading(false);
        return;
      }

      // Upload image to Supabase Storage
      const timestamp = Date.now();
      const fileName = `events/${timestamp}-${data.image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("event-images")
        .upload(fileName, data.image);

      if (uploadError) {
        toast.error("Failed to upload image: " + uploadError.message);
        setIsLoading(false);
        return;
      }

      // Insert event into database
      const { error: insertError } = await supabase.from("events").insert({
        title: data.title,
        description: data.description,
        event_date: new Date(data.event_date).toISOString(),
        image_url: fileName,
        tier: data.tier,
      });

      if (insertError) {
        toast.error("Failed to create event: " + insertError.message);
        setIsLoading(false);
        return;
      }

      toast.success("Event created successfully!");
      reset();
      setImagePreview(null);
      onOpenChange(false);
      onEventCreated?.();
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:max-w-1/4 w-full">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new event
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              placeholder="Enter event title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Enter event description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Event Date */}
          <div className="space-y-2">
            <Label htmlFor="event_date">Event Date & Time *</Label>
            <Input
              id="event_date"
              type="datetime-local"
              {...register("event_date")}
            />
            {errors.event_date && (
              <p className="text-sm text-red-500">
                {errors.event_date.message}
              </p>
            )}
          </div>

          {/* Tier Selection */}
          <div className="space-y-2">
            <Label htmlFor="tier">Access Tier *</Label>
            <Select
              defaultValue=""
              onValueChange={(value) =>
                setValue(
                  "tier",
                  value as "free" | "silver" | "gold" | "platinum",
                )
              }
            >
              <SelectTrigger id="tier">
                <SelectValue placeholder="Select tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
            {errors.tier && (
              <p className="text-sm text-red-500">{errors.tier.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2 flex flex-col">
            <div className="flex items-center gap-4">
              <Label htmlFor="image">Event Image *</Label>
              <div className="flex-1">
                <Input
                  id="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <p className="text-sm text-red-500">{errors.image.message}</p>
                )}
              </div>
            </div>
            {imagePreview && (
              <div className="flex rounded-md overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="rounded-md object-fit "
                  width={120}
                  height={120}
                />
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                reset();
                setImagePreview(null);
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Creating...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Create Event
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
