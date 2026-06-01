{
  description = "Sunday School Jeopardy development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
  };

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" ];

      forAllSystems = nixpkgs.lib.genAttrs systems;

      pkgsFor = system:
        import nixpkgs {
          inherit system;
        };
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = pkgsFor system;
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              nodejs_22
              pnpm
              git

              postgresql_16
              docker
              docker-compose

              openssl
              pkg-config
            ];

            shellHook = ''
              echo "Sunday School Jeopardy dev shell"
              echo "Node: $(node --version)"
              echo "pnpm: $(pnpm --version)"
              echo ""
              echo "Useful commands:"
              echo "  pnpm create vite apps/web --template react-ts"
              echo "  pnpm dlx @nestjs/cli new apps/api"
              echo "  docker compose up -d"
            '';
          };
        });
    };
}
