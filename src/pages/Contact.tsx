import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const Contact = () => {
  const { toast } = useToast();
  const [sending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = (formData.get("name") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();

    if (!name || !email || !message) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    // Build mailto link with form data
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:huruydesigns@gmail.com?subject=${subject}&body=${body}`;
    
    toast({ title: "Opening your email client", description: "Complete sending in your email app." });
    form.reset();
  };

  return (
    <Layout>
      <SEO
        title="Contact Huruy Kidanemariam | UX Designer"
        description="Get in touch with Huruy Kidanemariam for UX design collaborations, freelance projects, or full-time opportunities."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Huruy Kidanemariam",
          description: "Get in touch with Huruy Kidanemariam for UX design collaborations, freelance projects, or full-time opportunities.",
          url: "https://huruy.tech/contact",
          mainEntity: {
            "@type": "Person",
            name: "Huruy Kidanemariam",
            email: "huruydesigns@gmail.com",
            url: "https://huruy.tech",
            sameAs: ["https://www.linkedin.com/in/huruykidanemariam/"],
          },
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">Get In Touch</p>
              <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Contact Huruy Kidanemariam
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always open to new opportunities, collaborations, or just a friendly chat about design and technology. Drop me a message and I'll get back to you within 24 hours.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  I'm especially excited about projects involving accessible design, social impact, and complex enterprise systems. Currently open to full-time roles and select freelance collaborations.
                </p>
                <a href="mailto:huruydesigns@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                  <Mail className="h-5 w-5" /> huruydesigns@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/huruykidanemariam/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                  <Linkedin className="h-5 w-5" /> LinkedIn Profile
                </a>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Your name" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Tell me about your project or opportunity..." required rows={5} className="mt-1.5" maxLength={2000} />
                </div>
                <Button type="submit" size="lg" disabled={sending} className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                  {sending ? "Sending..." : <><Send className="h-4 w-4 mr-1" /> Send Message</>}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
