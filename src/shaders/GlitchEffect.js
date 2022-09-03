import {
  NearestFilter,
  RepeatWrapping,
  RGBAFormat,
  Uniform,
  Vector2,
} from "three";
import { GlitchMode, Effect, NoiseTexture } from "postprocessing";

const textureTag = "Glitch.Generated";
const fragmentShader = `uniform lowp sampler2D perturbationMap;

uniform bool active;
uniform float columns;
uniform float random;
uniform vec2 seeds;
uniform float amount;
uniform float angle;
uniform vec2 distortion;
uniform sampler2D imageData;
void mainUv(inout vec2 uv) {
	if(active) {

		if(uv.y < distortion.x + columns && uv.y > distortion.x - columns * random) {

			float sx = clamp(ceil(seeds.x), 0.0, 1.0);
			uv.y = sx * (1.0 - (uv.y + distortion.y)) + (1.0 - sx) * distortion.y;

		}

		if(uv.x < distortion.y + columns && uv.x > distortion.y - columns * random) {

			float sy = clamp(ceil(seeds.y), 0.0, 1.0);
			uv.x = sy * distortion.x + (1.0 - sy) * (1.0 - (uv.x + distortion.x));

		}

		vec2 normal = texture2D(perturbationMap, uv * random * random).rg;
		uv += normal * seeds * (random * 0.2);
		
    	

	}

}
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
	if(active) {
		float xs = floor(outputColor.x / 0.5);
    float ys = floor(outputColor.y / 0.5);
		vec2 offset = 0.01 * vec2(cos(0.02), sin(0.02));
    	vec4 cr = texture2D(imageData, uv + offset);
   	 	vec4 cga = texture2D(imageData, uv);
    	vec4 cb = texture2D(imageData, uv - offset);
		outputColor = vec4(cr.r, cga.g, cb.b, cga.a);
    
    vec4 snow = 200.*amount*vec4(rand(vec2(xs * seeds.x,ys * seeds.y*50.))*0.05);
    outputColor = outputColor+ snow;
	}else{
		outputColor = inputColor;
	}
}
`;
/**
 * Returns a random float in the specified range.
 *
 * @private
 * @param {Number} low - The lowest possible value.
 * @param {Number} high - The highest possible value.
 * @return {Number} The random value.
 */

function randomFloat(low, high) {
  return low + Math.random() * (high - low);
}

/**
 * A glitch effect.
 *
 * This effect can be used in conjunction with the {@link ChromaticAberrationEffect}.
 *
 * Reference: https://github.com/staffantan/unityglitch
 */

export class GlitchEffect extends Effect {
  /**
   * Constructs a new glitch effect.
   *
   * TODO Change ratio to 0.15.
   * @param {Object} [options] - The options.
   * @param {Vector2} [options.chromaticAberrationOffset] - A chromatic aberration offset. If provided, the glitch effect will influence this offset.
   * @param {Vector2} [options.delay] - The minimum and maximum delay between glitch activations in seconds.
   * @param {Vector2} [options.duration] - The minimum and maximum duration of a glitch in seconds.
   * @param {Vector2} [options.strength] - The strength of weak and strong glitches.
   * @param {Texture} [options.perturbationMap] - A perturbation map. If none is provided, a noise texture will be created.
   * @param {Number} [options.dtSize=64] - The size of the generated noise map. Will be ignored if a perturbation map is provided.
   * @param {Number} [options.columns=0.05] - The scale of the blocky glitch columns.
   * @param {Number} [options.ratio=0.85] - The threshold for strong glitches.
   */

  constructor({
    chromaticAberrationOffset = null,
    delay = new Vector2(1.5, 3.5),
    duration = new Vector2(0.6, 1.0),
    strength = new Vector2(0.3, 1.0),
    columns = 0.05,
    ratio = 0.85,
    perturbationMap = null,
    dtSize = 64,
    onFinish = null,
    mode = GlitchMode.SPORADIC,
  } = {}) {
    super("GlitchEffect", fragmentShader, {
      uniforms: new Map([
        ["perturbationMap", new Uniform(null)],
        ["imageData", new Uniform(null)],
        ["columns", new Uniform(columns)],
        ["active", new Uniform(false)],
        ["random", new Uniform(1.0)],
        ["angle", new Uniform(1.0)],
        ["amount", new Uniform(1.0)],
        ["seeds", new Uniform(new Vector2())],
        ["distortion", new Uniform(new Vector2())],
      ]),
    });

    if (perturbationMap === null) {
      const map = new NoiseTexture(dtSize, dtSize, RGBAFormat);
      map.name = textureTag;
      this.perturbationMap = map;
    } else {
      this.perturbationMap = perturbationMap;
    }

    this.time = 0;

    this.distortion = this.uniforms.get("distortion").value;

    this.delay = delay;

    this.duration = duration;

    this.breakPoint = new Vector2(
      randomFloat(this.delay.x, this.delay.y),
      randomFloat(this.duration.x, this.duration.y)
    );
    this.onFinish = onFinish;
    this.strength = strength;

    this.mode = mode;

    this.ratio = ratio;

    this.chromaticAberrationOffset = chromaticAberrationOffset;
  }

  get seeds() {
    return this.uniforms.get("seeds").value;
  }

  get active() {
    return this.uniforms.get("active").value;
  }

  isActive() {
    return this.active;
  }

  get minDelay() {
    return this.delay.x;
  }

  set minDelay(value) {
    this.delay.x = value;
  }

  getMinDelay() {
    return this.delay.x;
  }

  setMinDelay(value) {
    this.delay.x = value;
  }

  get maxDelay() {
    return this.delay.y;
  }

  set maxDelay(value) {
    this.delay.y = value;
  }

  getMaxDelay() {
    return this.delay.y;
  }

  setMaxDelay(value) {
    this.delay.y = value;
  }

  get minDuration() {
    return this.duration.x;
  }

  set minDuration(value) {
    this.duration.x = value;
  }

  getMinDuration() {
    return this.duration.x;
  }

  setMinDuration(value) {
    this.duration.x = value;
  }

  get maxDuration() {
    return this.duration.y;
  }

  set maxDuration(value) {
    this.duration.y = value;
  }

  getMaxDuration() {
    return this.duration.y;
  }

  setMaxDuration(value) {
    this.duration.y = value;
  }

  get minStrength() {
    return this.strength.x;
  }

  set minStrength(value) {
    this.strength.x = value;
  }

  getMinStrength() {
    return this.strength.x;
  }

  setMinStrength(value) {
    this.strength.x = value;
  }

  get maxStrength() {
    return this.strength.y;
  }

  set maxStrength(value) {
    this.strength.y = value;
  }

  getMaxStrength() {
    return this.strength.y;
  }

  setMaxStrength(value) {
    this.strength.y = value;
  }

  getMode() {
    return this.mode;
  }

  setMode(value) {
    this.mode = value;
  }
  getOnFinish() {
    return this.onFinish;
  }
  setOnFinish(value) {
    this.onFinish = value;
  }
  getGlitchRatio() {
    return 1.0 - this.ratio;
  }

  setGlitchRatio(value) {
    this.ratio = Math.min(Math.max(1.0 - value, 0.0), 1.0);
  }

  get columns() {
    return this.uniforms.get("columns").value;
  }

  set columns(value) {
    this.uniforms.get("columns").value = value;
  }

  getGlitchColumns() {
    return this.columns;
  }

  setGlitchColumns(value) {
    this.columns = value;
  }

  getChromaticAberrationOffset() {
    return this.chromaticAberrationOffset;
  }

  setChromaticAberrationOffset(value) {
    this.chromaticAberrationOffset = value;
  }

  get perturbationMap() {
    return this.uniforms.get("perturbationMap").value;
  }

  set perturbationMap(value) {
    const currentMap = this.perturbationMap;

    if (currentMap !== null && currentMap.name === textureTag) {
      currentMap.dispose();
    }

    value.minFilter = value.magFilter = NearestFilter;
    value.wrapS = value.wrapT = RepeatWrapping;
    value.generateMipmaps = false;

    this.uniforms.get("perturbationMap").value = value;
  }

  getPerturbationMap() {
    return this.perturbationMap;
  }

  setPerturbationMap(value) {
    this.perturbationMap = value;
  }

  generatePerturbationMap(value = 64) {
    const map = new NoiseTexture(value, value, RGBAFormat);
    map.name = textureTag;
    return map;
  }

  update(renderer, inputBuffer, deltaTime) {
    const mode = this.mode;
    const breakPoint = this.breakPoint;
    const offset = this.chromaticAberrationOffset;
    const s = this.strength;
    let time = this.time;
    let active = false;
    let r = 0.0,
      a = 0.0;
    let trigger;

    if (mode !== GlitchMode.DISABLED) {
      if (mode === GlitchMode.SPORADIC) {
        time += deltaTime;
        trigger = time > breakPoint.x;

        if (time >= breakPoint.x + breakPoint.y) {
          breakPoint.set(
            randomFloat(this.delay.x, this.delay.y),
            randomFloat(this.duration.x, this.duration.y)
          );

          time = 0;
          if (this.onFinish !== undefined && this.onFinish !== null) {
            this.onFinish();
          }
        }
      }

      r = Math.random();
      this.uniforms.get("random").value = r;

      // TODO change > to <.
      if ((trigger && r < this.ratio) || mode === GlitchMode.CONSTANT_WILD) {
        active = true;

        r *= s.y * 0.03;
        a = randomFloat(-Math.PI, Math.PI);

        this.seeds.set(randomFloat(-s.y, s.y), randomFloat(-s.y, s.y));
        this.distortion.set(randomFloat(0.0, 1.0), randomFloat(0.0, 1.0));
      } else if (trigger || mode === GlitchMode.CONSTANT_MILD) {
        active = true;

        r *= s.x * 0.03;
        a = randomFloat(-Math.PI, Math.PI);

        this.seeds.set(randomFloat(-s.x, s.x), randomFloat(-s.x, s.x));
        this.distortion.set(randomFloat(0.0, 1.0), randomFloat(0.0, 1.0));
      }

      this.time = time;
    }

    if (offset !== null) {
      if (active) {
        offset.set(Math.cos(a), Math.sin(a)).multiplyScalar(r);
      } else {
        offset.set(0.0, 0.0);
      }
    }
    this.uniforms.get("imageData").value = inputBuffer.texture;
    this.uniforms.get("amount").value = (Math.random() / 90) * 0.5;
    this.uniforms.get("angle").value = randomFloat(-Math.PI, Math.PI);
    this.uniforms.get("active").value = active;
  }

  /**
   * Deletes generated resources.
   */

  dispose() {
    const map = this.perturbationMap;

    if (map !== null && map.name === textureTag) {
      map.dispose();
    }
  }
}
