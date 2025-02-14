import useSWR from "swr";
import { UserOrganization } from "./getUserOrganizations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useOrganization = () => {
  const { data, isLoading, error, mutate } = useSWR<UserOrganization>(
    "/api/app/organizations/current"
  );
  const router = useRouter();

  const switchOrganization = async (organizationId: string) => {
    try {
      const response = await fetch("/api/app/organizations/current", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ organizationId }),
      });

      if (!response.ok) {
        throw new Error("Failed to switch organization");
      }

      await mutate();
      toast.success("Organization switched successfully");
      router.push("/app");
    } catch (error) {
      console.error("Error switching organization:", error);
      toast.error("Failed to switch organization");
    }
  };

  return {
    organization: data,
    isLoading,
    error,
    mutate,
    switchOrganization,
  };
};

export default useOrganization;
