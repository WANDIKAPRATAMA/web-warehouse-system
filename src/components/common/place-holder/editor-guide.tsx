import {
  FileText,
  Save,
  Undo,
  Redo,
  Paintbrush2,
  BookOpen,
  ChevronRight,
  MousePointerClick,
  LayoutPanelLeft,
  Search,
  Clock,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContainerIcons from "@/components/ui/container-icons";
import { Typography } from "@/components/ui/typography";
import Outer from "@/components/atoms/outer";

const EditorOverviewGuide = () => {
  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4">
    // <div className="min-h-screen rounded-2xl border  bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
    <div
      //   max-w-4xl border bg-card shadow-xl
      className="relative w-full  rounded-2xl  dark:border-gray-700"
    >
      {/* <div className="absolute right-4 top-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          className="rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </div> */}
      {/*  max-h-[90vh] */}
      <div className="overflow-y-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <ContainerIcons variant="blue" className="mx-auto w-8 h-8">
            <FileText className=" text-blue-600 dark:text-blue-400" />
          </ContainerIcons>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome to Our Porfolio Editor
          </h2>
          <p className="text-muted-foreground mt-2">
            Here's how to make the most of your writing experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Save Feature */}
          <FeatureCard
            icon={
              <Save className="h-5 w-5 text-green-600 dark:text-green-400" />
            }
            title="Save Your Work"
            description="While we auto-save your progress, you can manually save at any time. Your work is also automatically backed up."
            shortcut="Ctrl+S / ⌘+S"
          >
            <div className="mt-3 flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900/30 dark:text-green-200">
                <Save className="h-3 w-3" />
                Save
              </div>
              <span className="text-muted-foreground">Manual save button</span>
            </div>
          </FeatureCard>

          {/* Undo/Redo */}
          <FeatureCard
            icon={
              <div className="flex gap-1">
                <Undo className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <Redo className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            }
            title="Undo & Redo"
            description="Made a mistake? Easily undo or redo your changes. We keep track of your entire editing history."
            shortcut="Ctrl+Z/Y / ⌘+Z/Y"
          >
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                <Undo className="h-3 w-3" />
                Undo
              </div>
              <div className="flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                <Redo className="h-3 w-3" />
                Redo
              </div>
            </div>
          </FeatureCard>

          {/* Chapter Navigation */}
          <FeatureCard
            icon={
              <LayoutPanelLeft className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            }
            title="Chapter Navigation"
            description="Easily switch between chapters using the sidebar. Right-click for more options on each chapter."
            shortcut="Ctrl+Shift+N / ⌘+Shift+N"
          >
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Click to switch chapters
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Right-click for options
                </span>
              </div>
            </div>
          </FeatureCard>

          {/* Clear Formatting */}
          <FeatureCard
            icon={
              <Paintbrush2 className="h-5 w-5 text-red-600 dark:text-red-400" />
            }
            title="Clear Formatting"
            description="Reset text formatting to default with one click. Useful when copying content from other sources."
            shortcut="Ctrl+Shift+C / ⌘+Shift+C"
          >
            <div className="mt-3 flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs text-red-800 dark:bg-red-900/30 dark:text-red-200">
                <Paintbrush2 className="h-3 w-3" />
                Clear Format
              </div>
            </div>
          </FeatureCard>

          {/* Preview Mode */}
          <FeatureCard
            icon={
              <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            }
            title="Preview Mode"
            description="See how your chapter will look to readers. Toggle between edit and preview modes."
            shortcut="Ctrl+Shift+P / ⌘+Shift+P"
          >
            <div className="mt-3 flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                <BookOpen className="h-3 w-3" />
                Preview
              </div>
              <span className="text-muted-foreground">
                Toggle between modes
              </span>
            </div>
          </FeatureCard>

          {/* Search & Replace */}
          <FeatureCard
            icon={
              <Search className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            }
            title="Find & Replace"
            description="Quickly find text and replace across your entire chapter or novel."
            shortcut="Ctrl+F / ⌘+F"
          >
            <div className="mt-3 flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 rounded-full bg-teal-100 px-2 py-1 text-xs text-teal-800 dark:bg-teal-900/30 dark:text-teal-200">
                <Search className="h-3 w-3" />
                Find
              </div>
              <span className="text-muted-foreground">
                Search across content
              </span>
            </div>
          </FeatureCard>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t pt-6 dark:border-gray-700">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Your work is auto-saved every finished writing</span>
            </div>
            <Typography.Small>Got it! Start Writing</Typography.Small>
            {/* <Button onClick={onDismiss} className="gap-2">
              Got it! Start Writing
            </Button> */}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({
  icon,
  title,
  description,
  shortcut,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  shortcut?: string;
  children?: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader>
        <div>
          <Outer.Row>
            <CardTitle className="font-semibold">{title}</CardTitle>
            <div className="mt-1">{icon}</div>
          </Outer.Row>

          <CardContent>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              {description}
            </CardDescription>
            {shortcut && (
              <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <span className="rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-700">
                  {shortcut}
                </span>
                <span>keyboard shortcut</span>
              </div>
            )}
            {children}
          </CardContent>
        </div>
      </CardHeader>
    </Card>
    // <div className="rounded-lg border bg-background p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700">
    //   <div className="flex items-start gap-3">
    //     <div className="mt-1">{icon}</div>
    //     <div>
    //       <h3 className="font-semibold">{title}</h3>
    //       <p className="text-sm text-muted-foreground mt-1">{description}</p>
    //       {shortcut && (
    //         <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
    //           <span className="rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-700">
    //             {shortcut}
    //           </span>
    //           <span>keyboard shortcut</span>
    //         </div>
    //       )}
    //       {children}
    //     </div>
    //   </div>
    // </div>
  );
};

export default EditorOverviewGuide;
