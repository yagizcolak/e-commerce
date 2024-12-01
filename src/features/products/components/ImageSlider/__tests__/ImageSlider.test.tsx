import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ImageSlider from "../ImageSlider";

/*

The issue with line 92 (nextSlide();) not being covered stems from the fact that 
the setTimeout callback might not be executing within the test’s lifecycle, 
especially with real timers and asynchronous delays. 
The coverage tool only records lines that are executed during the test run.

*/

describe("ImageSlider", () => {
  const images = ["image1.jpg", "image2.jpg", "image3.jpg"];

  test("renders without crashing", () => {
    render(<ImageSlider images={images} />);
    expect(screen.getByAltText("Image 1")).toBeInTheDocument();
  });

  test("shows next image when next button is clicked", async () => {
    render(
      <ImageSlider
        images={images}
        showNavigation
        showThumbnails
        autoSlide={false}
      />
    );
    const mainImage = screen.getByTestId("main-image");
    const nextButton = screen.getByTestId("next-image-button");

    expect(mainImage).toHaveAttribute("src", "image1.jpg");

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mainImage).toHaveAttribute("src", "image2.jpg");
    });
  });

  test("wraps around to first image after last image in nextSlide", async () => {
    render(
      <ImageSlider
        images={images}
        showNavigation
        showThumbnails
        autoSlide={false}
      />
    );

    const mainImage = screen.getByTestId("main-image");
    const nextButton = screen.getByTestId("next-image-button");

    // Move to last image
    fireEvent.click(nextButton); // Index 1
    await waitFor(() => {
      expect(mainImage).toHaveAttribute("src", "image2.jpg");
    });

    fireEvent.click(nextButton); // Index 2
    await waitFor(() => {
      expect(mainImage).toHaveAttribute("src", "image3.jpg");
    });

    // Now click next to wrap around
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mainImage).toHaveAttribute("src", "image1.jpg");
    });
  });

  test("shows previous image when previous button is clicked", async () => {
    render(
      <ImageSlider
        images={images}
        showNavigation
        showThumbnails
        autoSlide={false}
      />
    );
    const mainImage = screen.getByTestId("main-image");
    const prevButton = screen.getByTestId("previous-image-button");

    expect(mainImage).toHaveAttribute("src", "image1.jpg");

    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(mainImage).toHaveAttribute("src", "image3.jpg");
    });
  });

  test("wraps around to last image when clicking previous on first image", async () => {
    render(
      <ImageSlider
        images={images}
        showNavigation
        showThumbnails
        autoSlide={false}
      />
    );

    const mainImage = screen.getByTestId("main-image");
    const prevButton = screen.getByTestId("previous-image-button");

    expect(mainImage).toHaveAttribute("src", "image1.jpg");

    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(mainImage).toHaveAttribute("src", "image3.jpg");
    });
  });

  test("changes image when thumbnail is clicked", async () => {
    render(
      <ImageSlider
        images={images}
        showThumbnails
        showNavigation
        autoSlide={false}
      />
    );

    const mainImage = screen.getByTestId("main-image");
    const thumbnail = screen.getByTestId("thumbnail-1");

    expect(mainImage).toHaveAttribute("src", "image1.jpg");

    fireEvent.click(thumbnail);

    await waitFor(() => {
      expect(mainImage).toHaveAttribute("src", "image2.jpg");
    });
  });

  test("does not change image when clicking on current thumbnail", async () => {
    render(<ImageSlider images={images} showThumbnails autoSlide={false} />);

    const mainImage = screen.getByTestId("main-image");
    const currentThumbnail = screen.getByTestId("thumbnail-0"); // Current index is 0

    expect(mainImage).toHaveAttribute("src", "image1.jpg");

    fireEvent.click(currentThumbnail);

    // Since the image should not change, we wait and then check
    await waitFor(() => {
      expect(mainImage).toHaveAttribute("src", "image1.jpg");
    });
  });

  test("auto slides to next image after interval", async () => {
    render(<ImageSlider images={images} autoSlide interval={500} />);

    const mainImage = screen.getByTestId("main-image");

    expect(mainImage).toHaveAttribute("src", "image1.jpg");

    await waitFor(
      () => {
        expect(mainImage).toHaveAttribute("src", "image2.jpg");
      },
      { timeout: 1000 }
    );
  });

  test("does not auto slide when autoSlide is false", async () => {
    render(<ImageSlider images={images} autoSlide={false} />);

    const mainImage = screen.getByTestId("main-image");

    expect(mainImage).toHaveAttribute("src", "image1.jpg");

    // Wait longer than interval to ensure auto slide does not happen
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(mainImage).toHaveAttribute("src", "image1.jpg"); // Image should not change
  });

  test("slides on hover when slideOnHover is true", async () => {
    render(
      <ImageSlider
        images={images}
        autoSlide={false}
        slideOnHover
        interval={500}
      />
    );

    const mainImage = screen.getByTestId("main-image");
    const sliderContainer = screen.getByTestId("slider-container");

    expect(mainImage).toHaveAttribute("src", "image1.jpg");

    fireEvent.mouseEnter(sliderContainer);

    await waitFor(
      () => {
        expect(mainImage).toHaveAttribute("src", "image2.jpg");
      },
      { timeout: 1000 }
    );
  });

  test("does not slide on hover when slideOnHover is false", async () => {
    render(
      <ImageSlider
        images={images}
        autoSlide={false}
        slideOnHover={false}
        interval={500}
      />
    );

    const mainImage = screen.getByTestId("main-image");
    const sliderContainer = screen.getByTestId("slider-container");

    expect(mainImage).toHaveAttribute("src", "image1.jpg");

    fireEvent.mouseEnter(sliderContainer);

    // Wait longer than interval to ensure slide does not happen
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(mainImage).toHaveAttribute("src", "image1.jpg"); // Should not change
  });

  test("pauses auto slide when mouse leaves and slideOnHover is true", async () => {
    render(
      <ImageSlider images={images} autoSlide slideOnHover interval={500} />
    );

    const mainImage = screen.getByTestId("main-image");
    const sliderContainer = screen.getByTestId("slider-container");

    expect(mainImage).toHaveAttribute("src", "image1.jpg");

    fireEvent.mouseEnter(sliderContainer);

    await waitFor(
      () => {
        expect(mainImage).toHaveAttribute("src", "image2.jpg");
      },
      { timeout: 1000 }
    );

    fireEvent.mouseLeave(sliderContainer);

    // Wait longer than interval to ensure auto slide does not happen
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(mainImage).toHaveAttribute("src", "image2.jpg"); // Should remain the same
  });

  test("calls nextSlide() when mouse enters and slideOnHover is true", async () => {
    render(
      <ImageSlider
        images={images}
        autoSlide={false}
        slideOnHover
        interval={500}
      />
    );

    const mainImage = screen.getByTestId("main-image");
    const sliderContainer = screen.getByTestId("slider-container");

    expect(mainImage).toHaveAttribute("src", "image1.jpg");

    fireEvent.mouseEnter(sliderContainer);

    await waitFor(
      () => {
        expect(mainImage).toHaveAttribute("src", "image2.jpg");
      },
      { timeout: 1000 }
    );
  });

  test("does not call nextSlide() when slideOnHover is false", async () => {
    render(
      <ImageSlider
        images={images}
        autoSlide={false}
        slideOnHover={false}
        interval={500}
      />
    );

    const mainImage = screen.getByTestId("main-image");
    const sliderContainer = screen.getByTestId("slider-container");

    fireEvent.mouseEnter(sliderContainer);

    // Wait to ensure nextSlide is not called
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(mainImage).toHaveAttribute("src", "image1.jpg");
  });
});
