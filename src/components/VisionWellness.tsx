import React, { useState } from "react";
import { VISION_TIPS, BLOG_POSTS } from "../data";
import { useAccessibility } from "../context/AccessibilityContext";
import { Sparkles, Calendar, ArrowRight, BookOpen, Clock, Heart } from "lucide-react";

export default function VisionWellness() {
  const { highContrast, textSize } = useAccessibility();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "screen", "prevention", "diet"];

  const filteredTips = selectedCategory === "all"
    ? VISION_TIPS
    : VISION_TIPS.filter(tip => tip.category === selectedCategory);

  const getHeadingSize = () => {
    if (textSize === "extra-large") return "text-3xl sm:text-4xl font-extrabold pb-1";
    if (textSize === "large") return "text-2.5xl sm:text-3xl font-extrabold pb-1";
    return "text-xl sm:text-2.5xl font-extrabold pb-1";
  };

  return (
    <section 
      id="wellness" 
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
        highContrast ? "bg-black border-white" : "bg-slate-50/70"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Module 1: Vision Tips section */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className={`text-xs font-bold uppercase tracking-widest font-mono ${
              highContrast ? "text-slate-200" : "text-blue-600"
            }`}>
              Daily Habits Guard
            </span>
            <h2 className={`${getHeadingSize()} ${highContrast ? "text-white" : "text-blue-950 font-display"}`}>
              Practical Vision Wellness Tips
            </h2>
            <div className={`h-1 w-20 mx-auto rounded-full ${highContrast ? "bg-white" : "bg-blue-600"}`} />
            <p className="text-sm text-slate-500 max-w-lg mx-auto">
              Small structural adjustments can make remarkable differences for visual strain recovery. Use these ophthalmology daily tips.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex justify-center flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all focus:outline-none border ${
                  selectedCategory === cat
                    ? highContrast
                      ? "bg-white text-black border-white"
                      : "bg-blue-600 border-blue-600 text-white shadow"
                    : highContrast
                      ? "bg-black text-slate-300 border-white hover:bg-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-blue-600"
                }`}
              >
                {cat === "all" ? "View All Tips" : `${cat} Care`}
              </button>
            ))}
          </div>

          {/* Tips cards list container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {filteredTips.map((tip) => (
              <div 
                key={tip.id}
                className={`p-6 rounded-2xl border flex gap-4 transition-all ${
                  highContrast 
                    ? "bg-black border-white text-white" 
                    : "bg-white border-slate-100 text-slate-800 shadow-sm"
                }`}
              >
                <div className={`p-3 rounded-xl h-fit ${
                  highContrast ? "bg-white text-black" : "bg-amber-50 text-amber-600"
                }`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className={`font-bold ${
                    textSize === "extra-large" ? "text-lg" : "text-sm sm:text-base"
                  } ${highContrast ? "text-white" : "text-blue-950"}`}>
                    {tip.title}
                  </h3>
                  <p className={`italic ${
                    textSize === "extra-large" ? "text-sm" : "text-xs font-semibold text-blue-600"
                  }`}>
                    Benefit: {tip.benefit}
                  </p>
                  <p className={`leading-relaxed ${
                    textSize === "extra-large" ? "text-base text-slate-300" : "text-sm text-slate-500 font-light"
                  }`}>
                    {tip.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: Eye Health Blog Preview */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className={`text-xs font-bold uppercase tracking-widest font-mono ${
              highContrast ? "text-slate-200" : "text-blue-600"
            }`}>
              Educative Library
            </span>
            <h2 className={`${getHeadingSize()} ${highContrast ? "text-white" : "text-blue-950 font-display"}`}>
              Eye Health Academic Blog Previews
            </h2>
            <div className={`h-1 w-20 mx-auto rounded-full ${highContrast ? "bg-white" : "bg-blue-600"}`} />
            <p className="text-sm text-slate-500 max-w-lg mx-auto">
              Stay ahead of symptoms and treatments with expert articles authored directly by our head ophthalmologists.
            </p>
          </div>

          {/* Blog preview cards layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article 
                key={post.id}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-colors shadow-sm ${
                  highContrast 
                    ? "bg-slate-950 border-white text-white" 
                    : "bg-white border-slate-100 text-slate-800 hover:shadow-md"
                }`}
              >
                <div className="space-y-4">
                  {/* Category Pill / reading tag */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span>{post.category}</span>
                    <span>&bull;</span>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className={`font-bold hover:underline cursor-pointer ${
                    textSize === "extra-large" ? "text-lg" : "text-base"
                  } ${highContrast ? "text-white" : "text-blue-950"}`}>
                    {post.title}
                  </h3>

                  <p className={`line-clamp-3 leading-relaxed ${
                    textSize === "extra-large" ? "text-base text-slate-300" : "text-sm text-slate-500 font-light"
                  }`}>
                    {post.excerpt}
                  </p>
                </div>

                {/* Author Segment details */}
                <div className="mt-6 pt-5 border-t border-slate-150/40 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">
                      Authored By
                    </span>
                    <span className={`font-bold text-xs ${highContrast ? "text-slate-200" : "text-slate-700"}`}>
                      {post.author}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                    {post.date}
                  </span>
                </div>

              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
