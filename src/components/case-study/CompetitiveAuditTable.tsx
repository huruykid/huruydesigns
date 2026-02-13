import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Competitor {
  name: string;
  highlight?: boolean;
}

interface Feature {
  name: string;
  support: boolean[];
}

interface CompetitiveAuditTableProps {
  competitors: Competitor[];
  features: Feature[];
}

const CompetitiveAuditTable = ({ competitors, features }: CompetitiveAuditTableProps) => (
  <div className="rounded-xl border border-border bg-card overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border">
          <th className="text-left p-4 font-semibold text-foreground sticky left-0 bg-card z-10 min-w-[180px]">
            Feature
          </th>
          {competitors.map((c, i) => (
            <th
              key={i}
              className={cn(
                "p-4 text-center font-semibold text-foreground min-w-[120px]",
                c.highlight && "bg-accent/10"
              )}
            >
              {c.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {features.map((feature, fi) => (
          <tr key={fi} className={cn("border-b border-border last:border-0", fi % 2 === 1 && "bg-muted/30")}>
            <td className="p-4 font-medium text-foreground sticky left-0 bg-inherit z-10">
              {feature.name}
            </td>
            {feature.support.map((supported, ci) => (
              <td
                key={ci}
                className={cn("p-4 text-center", competitors[ci]?.highlight && "bg-accent/10")}
              >
                <span className="inline-flex items-center justify-center">
                  {supported ? (
                    <span className="h-7 w-7 rounded-full bg-accent/20 flex items-center justify-center">
                      <Check className="h-4 w-4 text-accent" />
                    </span>
                  ) : (
                    <span className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                      <X className="h-4 w-4 text-muted-foreground/50" />
                    </span>
                  )}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CompetitiveAuditTable;
