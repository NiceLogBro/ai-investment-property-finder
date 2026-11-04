from setuptools import setup, find_packages

setup(
    name="property-finder",
    version="1.0.0",
    description="AI Investment Property Finder & Multi-Asset Portfolio Underwriting Library",
    author="Real Estate AI Labs",
    packages=find_packages(),
    python_requires=">=3.9",
    install_requires=[
        # Zero hard dependencies required for the core library!
    ],
    extras_require={
        "api": ["fastapi", "uvicorn"],
        "full": ["fastapi", "uvicorn", "pydantic", "httpx", "numpy", "pandas"],
    },
)
