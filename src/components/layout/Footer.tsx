import { Container } from './container';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-10">
          <div className="text-center md:text-left">
            <h3 className="text-h4 font-bold mb-1">CollegeHub</h3>
            <p className="text-small text-text-tertiary">Find your perfect college with ease</p>
          </div>
          <div className="text-small text-text-tertiary">
            © 2024 CollegeHub. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
